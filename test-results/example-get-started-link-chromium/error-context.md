# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> get started link
- Location: tests\example.spec.ts:10:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://playwright.dev/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Skip to main content":
    - link "Skip to main content" [ref=e3] [cursor=pointer]:
      - /url: "#__docusaurus_skipToContent_fallback"
  - navigation "Main" [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - link "Playwright logoPlaywright logo Playwright" [ref=e7] [cursor=pointer]:
          - /url: /
          - generic [ref=e8]:
            - img "Playwright logo" [ref=e9]
            - img "Playwright logo" [ref=e10]
          - generic [ref=e11]: Playwright
        - link "Docs" [ref=e12] [cursor=pointer]:
          - /url: /docs/intro
        - link "MCP" [ref=e13] [cursor=pointer]:
          - /url: /mcp/introduction
        - link "CLI" [ref=e14] [cursor=pointer]:
          - /url: /agent-cli/introduction
        - link "API" [ref=e15] [cursor=pointer]:
          - /url: /docs/api/class-playwright
        - button "Node.js" [ref=e17] [cursor=pointer]
      - generic [ref=e18]:
        - link "GitHub repository" [ref=e19] [cursor=pointer]:
          - /url: https://github.com/microsoft/playwright
        - link "Discord server" [ref=e20] [cursor=pointer]:
          - /url: https://aka.ms/playwright/discord
        - button "Switch between dark and light mode (currently system mode)" [disabled] [ref=e22]:
          - img [ref=e23]
        - button "Search (Command+K)" [ref=e26] [cursor=pointer]:
          - generic [ref=e27]:
            - img [ref=e28]
            - generic [ref=e30]: Search
  - generic [ref=e31]:
    - banner [ref=e32]:
      - generic [ref=e33]:
        - heading "Playwright enables reliable web automation for testing, scripting, and AI agents." [level=1] [ref=e34]
        - paragraph [ref=e35]:
          - text: One API to drive Chromium, Firefox, and WebKit — in your tests, your scripts, and your agent workflows. Available for
          - link "TypeScript" [ref=e36] [cursor=pointer]:
            - /url: https://playwright.dev/docs/intro
          - text: ","
          - link "Python" [ref=e37] [cursor=pointer]:
            - /url: https://playwright.dev/python/docs/intro
          - text: ","
          - link ".NET" [ref=e38] [cursor=pointer]:
            - /url: https://playwright.dev/dotnet/docs/intro
          - text: ", and"
          - link "Java" [ref=e39] [cursor=pointer]:
            - /url: https://playwright.dev/java/docs/intro
          - text: .
        - generic [ref=e40]:
          - link "Get started" [ref=e41] [cursor=pointer]:
            - /url: /docs/intro
          - generic [ref=e42]:
            - link "Star microsoft/playwright on GitHub" [ref=e43] [cursor=pointer]:
              - /url: https://github.com/microsoft/playwright
              - text: Star
            - link "89k+ stargazers on GitHub" [ref=e45] [cursor=pointer]:
              - /url: https://github.com/microsoft/playwright/stargazers
              - text: 89k+
    - main [ref=e46]:
      - generic [ref=e49]:
        - generic [ref=e50]:
          - heading "Playwright Test" [level=3] [ref=e51]
          - paragraph [ref=e52]: Full-featured test runner with auto-waiting, assertions, tracing, and parallelism across Chromium, Firefox, and WebKit.
          - code [ref=e53]: npm init playwright@latest
          - link "Testing documentation" [ref=e55] [cursor=pointer]:
            - /url: /docs/intro
        - generic [ref=e56]:
          - heading "Playwright CLI" [level=3] [ref=e57]
          - paragraph [ref=e58]: Token-efficient browser automation for coding agents like Claude Code and GitHub Copilot. Skill-based workflows without large context overhead.
          - code [ref=e59]: npm i -g @playwright/cli@latest
          - link "CLI documentation" [ref=e61] [cursor=pointer]:
            - /url: /docs/getting-started-cli
        - generic [ref=e62]:
          - heading "Playwright MCP" [level=3] [ref=e63]
          - paragraph [ref=e64]: Model Context Protocol server that gives AI agents full browser control through structured accessibility snapshots.
          - code [ref=e65]: npx @playwright/mcp@latest
          - link "MCP documentation" [ref=e67] [cursor=pointer]:
            - /url: /docs/getting-started-mcp
      - generic [ref=e69]:
        - heading "Built for testing" [level=2] [ref=e70]
        - generic [ref=e72]:
          - generic [ref=e73]:
            - heading "Auto-wait and web-first assertions" [level=4] [ref=e74]
            - paragraph [ref=e75]: Playwright waits for elements to be actionable before performing actions. Assertions automatically retry until conditions are met. No artificial timeouts, no flaky tests.
            - heading "Test isolation" [level=4] [ref=e76]
            - paragraph [ref=e77]: Each test gets a fresh browser context — equivalent to a brand new browser profile. Full isolation with near-zero overhead. Save authentication state once and reuse it across tests.
          - generic [ref=e78]:
            - heading "Resilient locators" [level=4] [ref=e79]
            - paragraph [ref=e80]:
              - text: "Find elements with selectors that mirror how users see the page:"
              - code [ref=e81]: getByRole
              - text: ","
              - code [ref=e82]: getByLabel
              - text: ","
              - code [ref=e83]: getByPlaceholder
              - text: ","
              - code [ref=e84]: getByTestId
              - text: . No brittle CSS paths.
            - heading "Parallelism and sharding" [level=4] [ref=e85]
            - paragraph [ref=e86]: Tests run in parallel by default across all configured browsers. Shard across multiple machines for faster CI. Full cross-browser coverage on every commit.
      - generic [ref=e88]:
        - heading "Built for AI agents" [level=2] [ref=e89]
        - generic [ref=e91]:
          - generic [ref=e92]:
            - heading "Accessibility snapshots, not screenshots" [level=4] [ref=e93]
            - paragraph [ref=e94]: Agents interact with pages through structured accessibility trees — element roles, names, and refs. Deterministic and unambiguous, no vision models required.
            - heading "MCP server" [level=4] [ref=e95]
            - paragraph [ref=e96]:
              - text: Drop-in
              - link "Model Context Protocol" [ref=e97] [cursor=pointer]:
                - /url: https://modelcontextprotocol.io
              - text: server for VS Code, Cursor, Claude Desktop, Windsurf, and any MCP client. Full browser control through standard tool calls.
          - generic [ref=e98]:
            - heading "CLI for coding agents" [level=4] [ref=e99]
            - paragraph [ref=e100]: Token-efficient command-line interface with installable skills. Purpose-built for Claude Code, GitHub Copilot, and similar coding agents that need to balance browser automation with large codebases.
            - heading "Session monitoring" [level=4] [ref=e101]
            - paragraph [ref=e102]: Visual dashboard with live screencast previews of all running browser sessions. Click any session to zoom in and take control.
      - generic [ref=e104]:
        - heading "Powerful tooling" [level=2] [ref=e105]
        - generic [ref=e107]:
          - generic [ref=e108]:
            - heading "Test generator" [level=4] [ref=e109]:
              - link "Test generator" [ref=e110] [cursor=pointer]:
                - /url: docs/codegen
            - paragraph [ref=e111]: Record your actions in the browser and Playwright writes the test code. Generate assertions from the recording toolbar. Pick locators by clicking on elements.
          - generic [ref=e112]:
            - heading "Trace Viewer" [level=4] [ref=e113]:
              - link "Trace Viewer" [ref=e114] [cursor=pointer]:
                - /url: docs/trace-viewer-intro
            - paragraph [ref=e115]: Full timeline of test execution with DOM snapshots, network requests, console logs, and screenshots at every step. Investigate failures without re-running.
          - generic [ref=e116]:
            - heading "VS Code extension" [level=4] [ref=e117]:
              - link "VS Code extension" [ref=e118] [cursor=pointer]:
                - /url: docs/getting-started-vscode
            - paragraph [ref=e119]: Run, debug, and generate tests directly in the editor. Set breakpoints, live-inspect locators in the browser, and view full execution traces in the sidebar.
      - generic [ref=e121]:
        - img "Chromium, Firefox, WebKit" [ref=e122]
        - paragraph [ref=e123]:
          - text: Any browser. Any platform. Chromium, Firefox, and WebKit on Linux, macOS, and Windows. Headless and headed. Also available for
          - link "Python" [ref=e124] [cursor=pointer]:
            - /url: https://playwright.dev/python/docs/intro
          - text: ","
          - link ".NET" [ref=e125] [cursor=pointer]:
            - /url: https://playwright.dev/dotnet/docs/intro
          - text: ", and"
          - link "Java" [ref=e126] [cursor=pointer]:
            - /url: https://playwright.dev/java/docs/intro
          - text: .
      - generic [ref=e130]:
        - heading "Chosen by companies and open source projects" [level=2] [ref=e131]
        - list [ref=e132]:
          - listitem [ref=e133]:
            - link "VS Code" [ref=e134] [cursor=pointer]:
              - /url: https://code.visualstudio.com
              - img "VS Code" [ref=e135]
          - listitem [ref=e136]:
            - link "Bing" [ref=e137] [cursor=pointer]:
              - /url: https://bing.com
              - img "Bing" [ref=e138]
          - listitem [ref=e139]:
            - link "Outlook" [ref=e140] [cursor=pointer]:
              - /url: https://outlook.com
              - img "Outlook" [ref=e141]
          - listitem [ref=e142]:
            - link "Disney+ Hotstar" [ref=e143] [cursor=pointer]:
              - /url: https://www.hotstar.com/
              - img "Disney+ Hotstar" [ref=e144]
          - listitem [ref=e145]:
            - link "Material UI" [ref=e146] [cursor=pointer]:
              - /url: https://github.com/mui-org/material-ui
              - img "Material UI" [ref=e147]
          - listitem [ref=e148]:
            - link "ING" [ref=e149] [cursor=pointer]:
              - /url: https://github.com/ing-bank/lion
              - img "ING" [ref=e150]
          - listitem [ref=e151]:
            - link "Adobe" [ref=e152] [cursor=pointer]:
              - /url: https://github.com/adobe/spectrum-web-components
              - img "Adobe" [ref=e153]
          - listitem [ref=e154]:
            - link "React Navigation" [ref=e155] [cursor=pointer]:
              - /url: https://github.com/react-navigation/react-navigation
              - img "React Navigation" [ref=e156]
          - listitem:
            - link "Accessibility Insights":
              - /url: https://accessibilityinsights.io/
              - img "Accessibility Insights"
  - contentinfo [ref=e157]:
    - generic [ref=e158]:
      - generic [ref=e159]:
        - generic [ref=e160]:
          - generic [ref=e161]: Learn
          - list [ref=e162]:
            - listitem [ref=e163]:
              - link "Getting started" [ref=e164] [cursor=pointer]:
                - /url: /docs/intro
            - listitem [ref=e165]:
              - link "Playwright Training" [ref=e166] [cursor=pointer]:
                - /url: https://learn.microsoft.com/en-us/training/modules/build-with-playwright/
                - text: Playwright Training
                - img [ref=e167]
            - listitem [ref=e169]:
              - link "Learn Videos" [ref=e170] [cursor=pointer]:
                - /url: /community/learn-videos
            - listitem [ref=e171]:
              - link "Feature Videos" [ref=e172] [cursor=pointer]:
                - /url: /community/feature-videos
        - generic [ref=e173]:
          - generic [ref=e174]: Community
          - list [ref=e175]:
            - listitem [ref=e176]:
              - link "Stack Overflow" [ref=e177] [cursor=pointer]:
                - /url: https://stackoverflow.com/questions/tagged/playwright
                - text: Stack Overflow
                - img [ref=e178]
            - listitem [ref=e180]:
              - link "Discord" [ref=e181] [cursor=pointer]:
                - /url: https://aka.ms/playwright/discord
                - text: Discord
                - img [ref=e182]
            - listitem [ref=e184]:
              - link "Twitter" [ref=e185] [cursor=pointer]:
                - /url: https://twitter.com/playwrightweb
                - text: Twitter
                - img [ref=e186]
            - listitem [ref=e188]:
              - link "LinkedIn" [ref=e189] [cursor=pointer]:
                - /url: https://www.linkedin.com/company/playwrightweb
                - text: LinkedIn
                - img [ref=e190]
        - generic [ref=e192]:
          - generic [ref=e193]: More
          - list [ref=e194]:
            - listitem [ref=e195]:
              - link "GitHub" [ref=e196] [cursor=pointer]:
                - /url: https://github.com/microsoft/playwright
                - text: GitHub
                - img [ref=e197]
            - listitem [ref=e199]:
              - link "YouTube" [ref=e200] [cursor=pointer]:
                - /url: https://www.youtube.com/channel/UC46Zj8pDH5tDosqm1gd7WTg
                - text: YouTube
                - img [ref=e201]
            - listitem [ref=e203]:
              - link "Blog" [ref=e204] [cursor=pointer]:
                - /url: https://dev.to/playwright
                - text: Blog
                - img [ref=e205]
            - listitem [ref=e207]:
              - link "Ambassadors" [ref=e208] [cursor=pointer]:
                - /url: /community/ambassadors
            - listitem [ref=e209]:
              - link "Microsoft Privacy Statement" [ref=e210] [cursor=pointer]:
                - /url: https://go.microsoft.com/fwlink/?LinkId=521839
                - text: Microsoft Privacy Statement
                - img [ref=e211]
      - generic [ref=e214]: Copyright © 2026 Microsoft
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('has title', async ({ page }) => {
  4  |   await page.goto('https://playwright.dev/');
  5  | 
  6  |   // Expect a title "to contain" a substring.
  7  |   await expect(page).toHaveTitle(/Playwright/);
  8  | });
  9  | 
  10 | test('get started link', async ({ page }) => {
> 11 |   await page.goto('https://playwright.dev/');
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  12 | 
  13 |   // Click the get started link.
  14 |   await page.getByRole('link', { name: 'Get started' }).click();
  15 | 
  16 |   // Expects page to have a heading with the name of Installation.
  17 |   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  18 | });
  19 | 
```