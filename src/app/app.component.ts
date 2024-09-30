import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorService } from './calculator.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'string-calculator';
  numbers = '';
  result: number | string = '';

  constructor(private calculatorService: CalculatorService) {
    this.crossCheck("");
    this.crossCheck("5");
    this.crossCheck("1,2");
    this.crossCheck("1\n2,3");
    this.crossCheck("//;\n1;2");
    this.crossCheck("1,-2,3");
    this.crossCheck("2,1001,6");
    this.crossCheck("//[*][%]\n1*2%3");
  }


  crossCheck(input: string) {
    try {
      this.result = this.calculatorService.add(input);
      console.log(`Input: "${input}" => Output: ${this.result}`);
    } catch (error: any) {
      console.log(`Input: "${input}" => Error: ${error.message}`);
    }
  }

}
