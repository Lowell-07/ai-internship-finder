#!/usr/bin/env python3
"""
Lightweight validation script for the restructured workspace.
"""

import sys
import time
from datetime import datetime

import requests

BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:3000"


class Colors:
    GREEN = "\033[92m"
    RED = "\033[91m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    END = "\033[0m"


def log(message, color=Colors.BLUE):
    print(f"{color}[{datetime.now().strftime('%H:%M:%S')}] {message}{Colors.END}")


def check_backend_health():
    response = requests.get(f"{BACKEND_URL}/api/health", timeout=5)
    return response.status_code == 200


def check_frontend_health():
    response = requests.get(FRONTEND_URL, timeout=5)
    return response.status_code == 200


def check_resume_upload():
    files = {"file": ("test_resume.pdf", b"%PDF-1.4 demo", "application/pdf")}
    response = requests.post(f"{BACKEND_URL}/api/resumes/upload", files=files, timeout=10)
    return response.status_code == 200


def check_agent_status():
    response = requests.get(f"{BACKEND_URL}/api/agents/status", timeout=5)
    return response.status_code == 200 and "agents" in response.json()


def run_all_tests():
    tests = [
        ("Backend health", check_backend_health),
        ("Frontend health", check_frontend_health),
        ("Resume upload", check_resume_upload),
        ("Agent status", check_agent_status),
    ]

    passed = 0
    for name, test in tests:
        try:
            result = test()
            log(f"{'PASS' if result else 'FAIL'}: {name}", Colors.GREEN if result else Colors.RED)
            passed += int(result)
        except Exception as exc:
            log(f"FAIL: {name} ({exc})", Colors.RED)
        time.sleep(0.2)

    log(f"Summary: {passed}/{len(tests)} checks passed", Colors.GREEN if passed == len(tests) else Colors.YELLOW)
    return 0 if passed == len(tests) else 1


if __name__ == "__main__":
    sys.exit(run_all_tests())
