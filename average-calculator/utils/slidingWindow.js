class SlidingWindow {
  constructor(size) {
    this.size = size;
    this.data = [];
  }

  addNumbers(numbers) {
    const uniqueNew = numbers.filter((n) => !this.data.includes(n));
    this.data.push(...uniqueNew);
    if (this.data.length > this.size) {
      this.data.splice(0, this.data.length - this.size); // maintain size
    }
  }

  getData() {
    return [...this.data];
  }

  getAverage() {
    if (this.data.length === 0) return 0;
    const sum = this.data.reduce((a, b) => a + b, 0);
    return parseFloat((sum / this.data.length).toFixed(2));
  }
}

module.exports = SlidingWindow;
