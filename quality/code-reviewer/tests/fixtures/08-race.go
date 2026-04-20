// TEST FIXTURE 08 — race condition in Go
// Expected: race condition found, fix must mention sync.Mutex or sync/atomic

package counter

import "sync"

// Counter is not thread-safe — concurrent calls to Increment/Decrement/Value
// will race on the underlying int field.
type Counter struct {
	value int
}

func NewCounter() *Counter {
	return &Counter{}
}

func (c *Counter) Increment() {
	c.value++ // race condition: no mutex protecting this write
}

func (c *Counter) Decrement() {
	c.value-- // race condition: no mutex protecting this write
}

func (c *Counter) Value() int {
	return c.value // race condition: no mutex protecting this read
}

// SafeCounter shows the correct approach for reference.
type SafeCounter struct {
	mu    sync.Mutex
	value int
}

func (sc *SafeCounter) Increment() {
	sc.mu.Lock()
	defer sc.mu.Unlock()
	sc.value++
}

func (sc *SafeCounter) Value() int {
	sc.mu.Lock()
	defer sc.mu.Unlock()
	return sc.value
}
