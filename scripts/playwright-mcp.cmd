@ECHO OFF
SETLOCAL

SET "SCRIPT_DIR=%~dp0"
FOR %%I IN ("%SCRIPT_DIR%..") DO SET "PROJECT_ROOT=%%~fI"
SET "PLAYWRIGHT_MCP_CLI=%PROJECT_ROOT%\node_modules\@playwright\mcp\cli.js"

IF NOT EXIST "%PLAYWRIGHT_MCP_CLI%" (
  ECHO Playwright MCP CLI not found at "%PLAYWRIGHT_MCP_CLI%". 1>&2
  EXIT /b 1
)

IF EXIST "%ProgramFiles%\nodejs\node.exe" (
  SET "NODE_EXE=%ProgramFiles%\nodejs\node.exe"
) ELSE IF DEFINED ProgramFiles(x86) IF EXIST "%ProgramFiles(x86)%\nodejs\node.exe" (
  SET "NODE_EXE=%ProgramFiles(x86)%\nodejs\node.exe"
) ELSE (
  FOR %%I IN (node.exe) DO SET "NODE_EXE=%%~$PATH:I"
)

IF NOT DEFINED NODE_EXE (
  ECHO Node.js was not found. Install Node.js 18+ or add node.exe to PATH. 1>&2
  EXIT /b 1
)

"%NODE_EXE%" "%PLAYWRIGHT_MCP_CLI%" %*
