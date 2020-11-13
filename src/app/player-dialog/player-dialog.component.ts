import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Country, Player, SquadNumber } from '../interfaces/players';
import { PlayerService } from '../services/player.service.service';
import {
  TeamService,
  TeamsTableHeaders,
} from '../services/team.service.service';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss'],
})
export class PlayerDialogComponent implements OnInit {
  @Input() player: Player;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  private team;
  private countries = Object.keys(Country).map((key) => ({
    label: key,
    key: Country[key],
  }));
  private squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map((key) => ({
      label: key,
      key: SquadNumber[key],
    }));

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

  private newPlayer(playerFormValue) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey = {
      ...playerFormValue,
      key,
    };
    const formattedTeam = {
      ...this.team,
      players: [
        ...(this.team.players ? this.team.players : []),
        playerFormValueKey,
      ],
    };
    this.teamService.editTeam(formattedTeam);
  }
  private editPlayer(playerFormValue) {
    const playerFormValueWithKey = {
      ...playerFormValue,
      $key: this.player.$key,
    };
    const playerFormValueWithFormattedKey = {
      ...playerFormValue,
      key: this.player.$key,
    };
    delete playerFormValueWithFormattedKey.$key;
    const moddifiedPlayers = this.team.players
      ? this.team.players.map((player) => {
          return player.key === this.player.$key
            ? playerFormValueWithFormattedKey
            : player;
        })
      : this.team.players;
    const formattedTeam = {
      ...this.team,
      players: [
        ...(moddifiedPlayers
          ? moddifiedPlayers
          : [playerFormValueWithFormattedKey]),
      ],
    };
    this.playerService.editPlayer(playerFormValueWithKey);
    this.teamService.editTeam(formattedTeam);
  }
  onSubmit(playerForm: NgForm) {
    const playerFormValue = { ...playerForm.value };
    if (playerForm.valid) {
      playerFormValue.leftFooted =
        playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    if (this.player) {
      this.editPlayer(playerFormValue);
      this.closeDialog.emit(true);
    } else {
      this.newPlayer(playerFormValue);

    }
  }
  onClose() {
    this.closeDialog.emit(true);
  }
}
