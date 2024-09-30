import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  add(numbers: string): number {
    if (numbers === "") return 0;

    let delimiters = [',', '\n'];
    if (numbers.startsWith("//")) {
      const delimiterSection = numbers.match(/\/\/(.+)\n/);
      if (delimiterSection) {
        const customDelimiterString = delimiterSection[1];
        delimiters = this.extractDelimiters(customDelimiterString);
        numbers = numbers.split('\n')[1];
      }
    }

    const numArray = this.splitNumbers(numbers, delimiters);
    const negativeNumbers = numArray.filter(n => n < 0);

    if (negativeNumbers.length) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }

    return numArray.filter(n => n <= 1000).reduce((sum, num) => sum + num, 0);
  }

  private splitNumbers(input: string, delimiters: string[]): number[] {
    const regex = new RegExp(`[${delimiters.join('')}]`);
    return input.split(regex).map(num => parseInt(num, 10)).filter(num => !isNaN(num));
  }

  private extractDelimiters(delimiterString: string): string[] {
    const multipleDelimiters = delimiterString.match(/\[.*?\]/g);
    if (multipleDelimiters) {
      return multipleDelimiters.map(d => d.slice(1, -1));
    }
    return [delimiterString];
  }
}
