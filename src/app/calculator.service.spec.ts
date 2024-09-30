import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should return 0 for an empty string', () => {
    expect(service.add("")).toBe(0);
  });

  it('should return the number itself for a single number', () => {
    expect(service.add("5")).toBe(5);
  });

  it('should return the sum of two numbers', () => {
    expect(service.add("1,2")).toBe(3);
  });

  it('should handle newlines between numbers', () => {
    expect(service.add("1\n2,3")).toBe(6);
  });

  it('should support custom single-character delimiter', () => {
    expect(service.add("//;\n1;2")).toBe(3);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => service.add("1,-2,3")).toThrowError("Negative numbers not allowed: -2");
  });

  it('should throw an error for multiple negative numbers', () => {
    expect(() => service.add("1,-2,-3")).toThrowError("Negative numbers not allowed: -2, -3");
  });

  it('should ignore numbers greater than 1000', () => {
    expect(service.add("2,1001,6")).toBe(8);
  });

  it('should handle multiple delimiters', () => {
    expect(service.add("//[*][%]\n1*2%3")).toBe(6);
  });
});

