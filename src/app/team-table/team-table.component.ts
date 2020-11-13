import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Country } from '../interfaces/players';
import { Team } from '../interfaces/team';
import { TeamService, TeamsTableHeaders } from '../services/team.service.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent implements OnInit {
  public teams$: Observable<Team[]>; // variable asincrona $
  public tableHeaders = TeamsTableHeaders;
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length === 0) {
          const team: Team = {
            name: 'TheTeam',
            country: Country.DominicanRepublic,
            players: null,
          };
          this.teamService.addTeam(team);
        }
      });
  }
}
