// Sample Test File - Jest Framework

describe('Math Operations', () => {
  // Test for addition
  test('should add two numbers correctly', () => {
    const result = 5 + 3;
    expect(result).toBe(8);
  });

  // Test for subtraction
  test('should subtract two numbers correctly', () => {
    const result = 10 - 4;
    expect(result).toBe(6);
  });

  // Test for multiplication
  test('should multiply two numbers correctly', () => {
    const result = 6 * 7;
    expect(result).toBe(42);
  });

  // Test for division
  test('should divide two numbers correctly', () => {
    const result = 20 / 4;
    expect(result).toBe(5);
  });
});

describe('String Operations', () => {
  // Test string concatenation
  test('should concatenate strings', () => {
    const result = 'Hello' + ' ' + 'World';
    expect(result).toBe('Hello World');
  });

  // Test string length
  test('should return correct string length', () => {
    const result = 'JavaScript'.length;
    expect(result).toBe(10);
  });

  // Test string includes
  test('should check if string includes substring', () => {
    const result = 'Testing is important'.includes('important');
    expect(result).toBe(true);
  });
});

describe('Array Operations', () => {
  // Test array length
  test('should return correct array length', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.length).toBe(5);
  });

  // Test array push
  test('should add element to array', () => {
    const arr = [];
    arr.push('item');
    expect(arr).toContain('item');
  });

  // Test array filter
  test('should filter array correctly', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = arr.filter(num => num > 2);
    expect(result).toEqual([3, 4, 5]);
  });
});

describe('Function Tests', () => {
  // Test function with parameters
  test('should calculate square of a number', () => {
    const square = (num) => num * num;
    expect(square(5)).toBe(25);
  });

  // Test function with multiple parameters
  test('should sum multiple numbers', () => {
    const sum = (a, b, c) => a + b + c;
    expect(sum(1, 2, 3)).toBe(6);
  });

  // Test function that returns object
  test('should return user object', () => {
    const getUser = () => ({ id: 1, name: 'John', age: 30 });
    const user = getUser();
    expect(user.name).toBe('John');
    expect(user.age).toBe(30);
  });
});
