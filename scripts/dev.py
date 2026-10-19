"""Run owned local processes, without replacing any existing listeners."""

import signal
import socket
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
for port in (5173, 8765):
    with socket.socket() as sock:
        if sock.connect_ex(("127.0.0.1", port)) == 0:
            raise SystemExit(f"Port {port} is already occupied. Inspect its owner; no process was stopped.")
processes = [
    subprocess.Popen(
        [
            sys.executable,
            "-m",
            "uvicorn",
            "services.api.main:app",
            "--host",
            "127.0.0.1",
            "--port",
            "8765",
            "--no-access-log",
        ],
        cwd=ROOT,
    ),
    subprocess.Popen(["npm", "run", "dev"], cwd=ROOT),
]


def stop(*args):
    for process in processes:
        if process.poll() is None:
            process.terminate()
    for process in processes:
        process.wait(timeout=10)


signal.signal(signal.SIGTERM, lambda *args: sys.exit(0))
signal.signal(signal.SIGINT, lambda *args: sys.exit(0))
try:
    print("Sakhi public preview: http://127.0.0.1:5173/en-IN/", flush=True)
    while all(p.poll() is None for p in processes):
        time.sleep(0.5)
finally:
    stop()
