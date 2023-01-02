/**
 * Possible color palette values
 * Usually they would correspond to the following colors
 * - primary --> blue
 * - neutral --> gray
 * - success --> green
 * - destructive --> red
 * - warn --> yellow
 * - white -->  white
 *
 * What to do when a component only accepts a sub-set of this colors ?
 * Use Exclude
 *
 * Example: color input should be  'neutral' | 'primary' | 'success' | 'destructive'
 *
 * ```
 * @Input() color: Exclude<ThemeColor, 'warn' | 'white'> ;
 * ```
 */
export type ThemeColor =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'destructive'
  | 'warn'
  | 'white';
