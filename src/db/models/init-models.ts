import type { Sequelize } from "sequelize";
import { AvailabilityRecurring as _AvailabilityRecurring } from "./availability_recurring";
import type { AvailabilityRecurringAttributes, AvailabilityRecurringCreationAttributes } from "./availability_recurring";
import { AvailabilityWindow as _AvailabilityWindow } from "./availability_window";
import type { AvailabilityWindowAttributes, AvailabilityWindowCreationAttributes } from "./availability_window";
import { Frequency as _Frequency } from "./frequency";
import type { FrequencyAttributes, FrequencyCreationAttributes } from "./frequency";
import { Game as _Game } from "./game";
import type { GameAttributes, GameCreationAttributes } from "./game";
import { Match as _Match } from "./match";
import type { MatchAttributes, MatchCreationAttributes } from "./match";
import { User as _User } from "./user";
import type { UserAttributes, UserCreationAttributes } from "./user";
import { UsersGame as _UsersGame } from "./users_game";
import type { UsersGameAttributes, UsersGameCreationAttributes } from "./users_game";
import { UsersMatch as _UsersMatch } from "./users_match";
import type { UsersMatchAttributes, UsersMatchCreationAttributes } from "./users_match";

export {
  _AvailabilityRecurring as AvailabilityRecurring,
  _AvailabilityWindow as AvailabilityWindow,
  _Frequency as Frequency,
  _Game as Game,
  _Match as Match,
  _User as User,
  _UsersGame as UsersGame,
  _UsersMatch as UsersMatch,
};

export type {
  AvailabilityRecurringAttributes,
  AvailabilityRecurringCreationAttributes,
  AvailabilityWindowAttributes,
  AvailabilityWindowCreationAttributes,
  FrequencyAttributes,
  FrequencyCreationAttributes,
  GameAttributes,
  GameCreationAttributes,
  MatchAttributes,
  MatchCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  UsersGameAttributes,
  UsersGameCreationAttributes,
  UsersMatchAttributes,
  UsersMatchCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const AvailabilityRecurring = _AvailabilityRecurring.initModel(sequelize);
  const AvailabilityWindow = _AvailabilityWindow.initModel(sequelize);
  const Frequency = _Frequency.initModel(sequelize);
  const Game = _Game.initModel(sequelize);
  const Match = _Match.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const UsersGame = _UsersGame.initModel(sequelize);
  const UsersMatch = _UsersMatch.initModel(sequelize);

  AvailabilityRecurring.belongsTo(Frequency, { as: "freq", foreignKey: "freq_id"});
  Frequency.hasMany(AvailabilityRecurring, { as: "availability_recurrings", foreignKey: "freq_id"});
  Match.belongsTo(Game, { as: "game", foreignKey: "game_id"});
  Game.hasMany(Match, { as: "matches", foreignKey: "game_id"});
  UsersGame.belongsTo(Game, { as: "game", foreignKey: "game_id"});
  Game.hasMany(UsersGame, { as: "users_games", foreignKey: "game_id"});
  UsersMatch.belongsTo(Match, { as: "match", foreignKey: "match_id"});
  Match.hasMany(UsersMatch, { as: "users_matches", foreignKey: "match_id"});
  AvailabilityRecurring.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(AvailabilityRecurring, { as: "availability_recurrings", foreignKey: "user_id"});
  AvailabilityWindow.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(AvailabilityWindow, { as: "availability_windows", foreignKey: "user_id"});
  UsersGame.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(UsersGame, { as: "users_games", foreignKey: "user_id"});
  UsersMatch.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(UsersMatch, { as: "users_matches", foreignKey: "user_id"});

  return {
    AvailabilityRecurring: AvailabilityRecurring,
    AvailabilityWindow: AvailabilityWindow,
    Frequency: Frequency,
    Game: Game,
    Match: Match,
    User: User,
    UsersGame: UsersGame,
    UsersMatch: UsersMatch,
  };
}
