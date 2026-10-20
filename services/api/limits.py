"""Process-local work budget. Stores monotonic times only, no client identity or text."""

import threading
import time
from collections import deque


class LocalBudget:
    def __init__(self, limit=120, seconds=60, clock=time.monotonic):
        self.limit, self.seconds, self.clock = limit, seconds, clock
        self.events = deque()
        self.lock = threading.Lock()

    def __call__(self):
        with self.lock:
            now = self.clock()
            while self.events and self.events[0] <= now - self.seconds:
                self.events.popleft()
            if len(self.events) >= self.limit:
                return False
            self.events.append(now)
            return True
