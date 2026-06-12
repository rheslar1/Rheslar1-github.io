# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: axe-and-keyboard.spec.ts >> Accessibility + keyboard smoke >> home route - axe checks
- Location: tests/axe-and-keyboard.spec.ts:11:7

# Error details

```
Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'run')
    at eval (eval at evaluate (:302:30), <anonymous>:2:27)
    at UtilityScript.evaluate (<anonymous>:304:16)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

# Page snapshot

```yaml
- link "Skip to main content" [ref=e1] [cursor=pointer]:
  - /url: "#main-content"
```