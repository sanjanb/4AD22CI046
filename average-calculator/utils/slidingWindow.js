class SlidingWindow {
  constructor(size) {
    this.size = size;
    this.data = [];
  }

  addNumbers(numbers) {
    const newNumbers = [];
    for (const num of numbers) {
      if (!this.data.includes(num)) {
        this.data.push(num);
        newNumbers.push(num);
      }
    }

    if (this.data.length > this.size) {
      this.data = this.data.slice(this.data.length - this.size);
    }

    return newNumbers;
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
