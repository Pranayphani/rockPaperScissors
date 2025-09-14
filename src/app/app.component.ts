import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'app';
  protected result!: string;
  protected userScore!: number;
  protected computerScore!: number;
  protected totalGames!: number;
  protected draws!: number;
  protected autoplaySetup: boolean = false;
  protected autoplayText: string = 'Auto Play';
  protected id!: any;

  protected computerMove(user: string) {
    let userPick = user;
    let computerPick = '';
    let randomNumber = Number(Math.random().toFixed(1));
    if (randomNumber <= 1 / 3) {
      computerPick = 'rock';
    } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
      computerPick = 'paper';
    } else {
      computerPick = 'scissor';
    }

    this.playGame(userPick, computerPick);
  }

  protected userRandomMove(): string {
    let randomNumber = Number(Math.random().toFixed(1));
    let userPick = '';
    if (randomNumber <= 1 / 3) {
      userPick = 'rock';
    } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
      userPick = 'paper';
    } else {
      userPick = 'scissor';
    }

    return userPick;
  }

  protected resetScore() {
    this.totalGames = 0;
    this.userScore = 0;
    this.computerScore = 0;
    this.draws = 0;
  }
  protected playGame(userPick: string, computerPick: string) {
    this.totalGames += 1;
    if (userPick === computerPick) {
      this.result = `user pick: ${userPick} - computer pick: ${computerPick}. Game Draw`;
      this.draws += 1;
    } else if (userPick === 'rock' && computerPick === 'scissor') {
      this.result = `user pick: ${userPick} - computer pick: ${computerPick}. You Won`;
      this.userScore += 1;
    } else if (userPick === 'rock' && computerPick === 'paper') {
      this.result = `user pick: ${userPick} - computer pick: ${computerPick}. You Lose`;
      this.computerScore += 1;
    } else if (userPick === 'paper' && computerPick === 'rock') {
      this.result = `user pick: ${userPick} - computer pick: ${computerPick}. You Won`;
      this.userScore += 1;
    } else if (userPick === 'paper' && computerPick === 'scissor') {
      `user pick: ${userPick} - computer pick: ${computerPick}. You Lose`;
      this.computerScore += 1;
    } else if (userPick === 'scissor' && computerPick === 'rock') {
      `user pick: ${userPick} - computer pick: ${computerPick}. You Lose`;
      this.computerScore += 1;
    } else if (userPick === 'scissor' && computerPick === 'paper') {
      `user pick: ${userPick} - computer pick: ${computerPick}. You Won`;
      this.userScore += 1;
    }

    localStorage.setItem('totalgames', JSON.stringify(this.totalGames));
    localStorage.setItem('wins', JSON.stringify(this.userScore));
    localStorage.setItem('loses', JSON.stringify(this.computerScore));
    localStorage.setItem('draws', JSON.stringify(this.draws));
  }

  protected autoPlay() {
    this.autoplaySetup = !this.autoplaySetup;
    if (this.autoplaySetup) {
      this.autoplayText = 'Stop Autoplay';
      this.id = setInterval(() => {
        const userPick = this.userRandomMove();
        this.computerMove(userPick);
      }, 1000);
    } else {
      this.autoplayText = 'Auto Play';
      clearInterval(this.id);
    }
  }

  ngOnInit(): void {
    const storedGames = localStorage.getItem('totalgames');
    const storedWins = localStorage.getItem('wins');
    const storedLoses = localStorage.getItem('loses');
    const storedDraws = localStorage.getItem('draws');
    this.totalGames = storedGames ? JSON.parse(storedGames) : 0;
    this.userScore = storedWins ? JSON.parse(storedWins) : 0;
    this.computerScore = storedLoses ? JSON.parse(storedLoses) : 0;
    this.draws = storedDraws ? JSON.parse(storedDraws) : 0;
  }
}
