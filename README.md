# Remote Debug Server

Start VS Code/Cursor debugging via TCP socket.

## Usage

The extension listens on port 9999 (configurable). Send any data to trigger debugging:

```bash
echo "start" | nc localhost 9999
```

## Configuration

- `remoteDebugServer.port`: Port to listen on (default: 9999)

## Install from VSIX

```bash
code --install-extension remote-debug-server-1.0.0.vsix
# or for Cursor
cursor --install-extension remote-debug-server-1.0.0.vsix
```
