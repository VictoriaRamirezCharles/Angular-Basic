import { Player, Country } from "./players";

export interface Team{
    $key?: string;
    name: string;
    country: Country;
    players: Player[]
}