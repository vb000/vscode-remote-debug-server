const vscode = require('vscode');
const net = require('net');

let server = null;

function activate(context) {
    const config = vscode.workspace.getConfiguration('remoteDebugServer');
    const port = config.get('port', 9999);

    server = net.createServer((socket) => {
        socket.on('data', () => {
            vscode.commands.executeCommand('workbench.action.debug.start');
            socket.write('OK');
            socket.end();
        });

        socket.on('error', (err) => {
            console.error('remote-debug-server socket error:', err.message);
        });
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            vscode.window.showErrorMessage(`Remote Debug Server: Port ${port} is already in use`);
        } else {
            console.error('remote-debug-server error:', err);
        }
    });

    server.listen(port, () => {
        console.log(`remote-debug-server: listening on port ${port}`);
    });

    context.subscriptions.push({
        dispose: () => {
            if (server) {
                server.close();
                server = null;
            }
        }
    });
}

function deactivate() {
    if (server) {
        server.close();
        server = null;
    }
}

module.exports = { activate, deactivate };
