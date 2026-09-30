/**
 * Re-export of the AI-generated PNGs in ../../assets (produced by the asset
 * step of the pipeline). Every path is a literal require() so Metro can
 * resolve them statically.
 */
import type { ImageSourcePropType } from 'react-native';

export const bgLoader: ImageSourcePropType = require('../../assets/bg_loader.png');
export const bgMenu: ImageSourcePropType = require('../../assets/bg_menu.png');
export const bgGame: ImageSourcePropType = require('../../assets/bg_game.png');

export const leafMark: ImageSourcePropType = require('../../assets/sprite_leaf_mark.png');
export const meadowHero: ImageSourcePropType = require('../../assets/sprite_meadow_hero.png');

export const moodRadiant: ImageSourcePropType = require('../../assets/sprite_mood_radiant.png');
export const moodCalm: ImageSourcePropType = require('../../assets/sprite_mood_calm.png');
export const moodSteady: ImageSourcePropType = require('../../assets/sprite_mood_steady.png');
export const moodLow: ImageSourcePropType = require('../../assets/sprite_mood_low.png');
export const moodStorm: ImageSourcePropType = require('../../assets/sprite_mood_storm.png');
