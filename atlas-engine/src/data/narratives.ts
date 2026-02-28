// ─── Scenario Narratives ──────────────────────────────────────────────────────
// Each scenario has:
//   narrative: why the bias exists (pre-trade context)
//   lossReasons: possible reasons if the trade fails

export interface ScenarioNarrative {
  narrative: string;
  lossReasons: string[];
}

export const NARRATIVES: Record<string, ScenarioNarrative> = {

  // ═══════════════════════════════════════════════════════════════════════════
  // VETTED
  // ═══════════════════════════════════════════════════════════════════════════

  'V-01': {
    narrative: "Price consolidated inside PDR, then C2 swept lows trapping buyers. C3 recovered but C4 whipsawed — sellers used the fake pump to load shorts above. Sellers in control, buyers trapped below.",
    lossReasons: ['Higher timeframe bullish trend overriding', 'News event drove price up', 'C4 whipsaw not confirmed — entry was premature', 'PDL already taken on a prior day, no clean target'],
  },
  'V-02': {
    narrative: "Aggressive bear setup. C2 swept lows, C3 and C4 both pushed higher — this is a classic liquidity grab above PDH. Smart money distributed into retail buyers. Expect a sharp reversal down.",
    lossReasons: ['Higher timeframe bullish — PDH break was genuine', 'Low float or spread manipulation', 'C3 close above PDH signals continuation, not distribution', 'Macro news supporting bulls'],
  },
  'V-03': {
    narrative: "Price trended up inside PDR. C2 ranged — accumulation. C3 broke setup high and PDH, confirming bullish intent. C4 inside — consolidation before continuation. Buyers firmly in control.",
    lossReasons: ['Higher timeframe resistance at PDH level', 'PDH broke but failed to hold — false breakout', 'C3 close back inside PDR negates the setup', 'Overbought on HTF, reversal likely'],
  },
  'V-04': {
    narrative: "Price broke PDH then C2 ranged. C3 whipsawed — sellers tried to push down but got squeezed. C4 broke C3 low, confirming the trap. Bears loaded above, now driving price to PDL.",
    lossReasons: ['HTF bullish — PDH break continuation in play', 'C3 whipsaw not clean — could be accumulation', 'Strong support at C2 low holding', 'News catalyst pushing price higher'],
  },
  'V-05': {
    narrative: "Sustained downtrend — C2 and C3 both broke lower and held. C4 trending up is a pullback into bearish order flow. First FVG after 7am is where sellers reload. Target is 2 SD extension.",
    lossReasons: ['HTF bullish reversal zone reached', 'C4 trend up is stronger than expected — buyers stepping in early', 'PDL already extended — no clean target below', 'Fundamental shift in sentiment'],
  },
  'V-06': {
    narrative: "C2 swept PDL trapping sellers. C3 broke lower but failed and closed back inside PDR — sellers exhausted. C4 pushed above, confirming bull reversal. PDL sweep was a stop hunt.",
    lossReasons: ['HTF bearish trend continuing — PDL break was genuine', 'C3 close inside PDR was temporary — bears reloaded', 'No demand above — buyers not committing', 'Macro conditions bearish'],
  },
  'V-07': {
    narrative: "Price trended down inside PDR. C2 ranged — no commitment. C3 broke higher, signalling that bears are exhausted. C4 ranging inside — buyers building position. Entry below C3 low on any pullback.",
    lossReasons: ['HTF bearish — C3 high is just a retracement', 'C3 close inside signals weak buyers', 'PDH too far — no momentum to reach target', 'Selling pressure returning after C4 range'],
  },
  'V-08': {
    narrative: "Price broke PDH but closed back inside — failed breakout. C2 ranged. C3 broke setup low and PDL and held — strong bearish confirmation. Sellers trapped buyers above PDH, now targeting 2SD extension.",
    lossReasons: ['HTF bullish — PDL break is a stop hunt', 'C3 failed to hold below — bounce incoming', 'Major support below PDL holding price', 'News driven spike down — not structural'],
  },
  'V-09': {
    narrative: "Price inside PDR. C2 broke low and held — first bearish leg confirmed. C3 ranged — pause. C4 broke C3 low and held — continuation confirmed. Sellers stacking pressure. Entry above C3 high on any retrace.",
    lossReasons: ['HTF bullish trend — pullback only', 'C4 break was a stop hunt below C3', 'Buyers absorbing at current level', 'PDL already close — risk/reward tight'],
  },
  'V-10': {
    narrative: "PDL broken but price closed back inside — indecision. C2 broke lower, closing inside — double confirmation of bearish intent. C3 ranged. C4 broke higher — final trap for buyers before sellers push down to C2 low.",
    lossReasons: ['HTF bullish recovery in progress', 'C4 high break is genuine continuation up', 'C2 low already acted as support — buyers defending', 'Tight range — no clean momentum forming'],
  },
  'V-11': {
    narrative: "Price trended down inside PDR. C2 swept lows, closing inside — bear trap potential, but C3 and C4 both pushed higher, trapping sellers. Bears are now squeezed. Expect price to reverse to PDL after buyers are trapped above.",
    lossReasons: ['HTF bullish — setup is actually a continuation up', 'C4 break of C3 high is too strong — momentum up', 'PDL already used as target — no clean level below', 'Stop hunt above then continuation higher'],
  },
  'V-12': {
    narrative: "Price trended up inside PDR. C2 broke high and held — bull confirmed. C3 broke C2 high but closed inside — slight hesitation. C4 ranging — breather. Entry below C1 low as bears get one more sweep before bulls take over.",
    lossReasons: ['HTF bearish — C2 break was a liquidity sweep', 'C3 closing inside signals reversal', 'C4 range breaks down instead of up', 'No follow-through above C3 high'],
  },
  'V-13': {
    narrative: "C2 broke high and PDH — liquidity grabbed above prior day. C3 continued higher — momentum strong. C4 ranging inside. Bulls in full control. Entry below C4 low gives risk-defined long toward 2SD.",
    lossReasons: ['PDH grab was distribution — reversal coming', 'HTF resistance at this level — no continuation', 'C3 and C4 both close inside — exhaustion', 'News driven spike, not sustained'],
  },
  'V-14': {
    narrative: "Price broke PDH and held — strong bull context. C2 and C3 both broke higher — momentum stacking. C4 ranging — consolidation before next leg. Bulls in full control targeting new highs.",
    lossReasons: ['Triple push higher — exhaustion pattern', 'HTF resistance cluster above', 'C4 range breaks down — reversal starting', 'Distribution happening inside C4 range'],
  },
  'V-15': {
    narrative: "Price trended up inside PDR. C2 broke PDH but closed back inside — failed breakout, buyers trapped above. C3 and C4 ranging — distribution phase. Entry above C2 high targets the trapped buyers. PDL is the target.",
    lossReasons: ['PDH break was genuine — continuation higher', 'C2 close inside was temporary — bulls reload', 'HTF bullish trend supporting price', 'Fundamental news driving price up'],
  },
  'V-16': {
    narrative: "C2 broke PDL and held — sellers in control initially. C3 ranged. C4 broke lower but closed back inside — sellers exhausted, reversal signal. Bulls stepping in. 7am open is the entry with PDH as target.",
    lossReasons: ['PDL break continuation — bears reloading', 'C4 close inside was temporary — sellers return', 'HTF bearish trend still intact', 'No buying pressure visible above'],
  },
  'V-17': {
    narrative: "Price trended up inside PDR. C2 broke PDH and held — strong bull. C3 and C4 both pulled back inside — normal retracement after PDH sweep. Smart money reloading longs. Entry below 7am low targets 2SD extension.",
    lossReasons: ['HTF resistance at PDH — distribution not continuation', 'C3 and C4 pullback too deep — structure broken', 'Sellers defending PDH aggressively', 'Failed retest — bulls not stepping in'],
  },
  'V-18': {
    narrative: "Price trended down inside PDR. C2 ranged — no follow-through from bears. C3 broke setup low and held — last bearish push. C4 ranging — exhaustion. Bulls loading below C3 low. Expect reversal to PDH.",
    lossReasons: ['HTF bearish — C3 low break continuation', 'C4 range breaks down — sellers reloading', 'No demand below setup low', 'Fundamental bearish pressure continuing'],
  },
  'V-19': {
    narrative: "Price ranging inside PDR. C2 swept PDL and held — first bear leg. C3 continued lower — momentum. C4 broke higher, closing inside — last pull to trap buyers before final push down. Sellers in control.",
    lossReasons: ['HTF bullish reversal — PDL sweep was stop hunt', 'C4 break higher was genuine — continuation up', 'Double bottom forming at lows', 'Strong buying reaction at PDL'],
  },
  'V-20': {
    narrative: "Price broke PDL and held below. C2 continued lower — aggressive sellers. C3 bounced inside — retracement. C4 broke lower again — bear continuation confirmed. Sellers firmly in control, no entry yet — wait for structure.",
    lossReasons: ['HTF support holding — reversal incoming', 'C3 bounce stronger than expected', 'Buyers aggressively defending below PDL', 'News catalyst reversing bearish momentum'],
  },
  'V-21': {
    narrative: "Price broke PDH then closed inside — indecision. C2 and C3 both broke lower — sharp reversal from highs. C4 broke back above — last chance for bulls before bears take over. Entry below Fam low targets PDH before bearish continuation.",
    lossReasons: ['HTF bullish — C2/C3 drop was a stop hunt', 'C4 break higher continues — no reversal', 'Buyers too aggressive — bears overwhelmed', 'PDH acts as strong support not resistance'],
  },
  'V-22': {
    narrative: "Price ranging inside PDR. C2 ranging. C3 and C4 both broke above setup high — double confirmation of liquidity grab. Smart money distributed above. Entry above Fam high — then sharp reversal down to C1 low and PDL.",
    lossReasons: ['HTF bullish breakout — C3/C4 continuation', 'Setup high was genuine resistance — no distribution', 'Low volume on C3/C4 breaks — weak signal', 'News driven momentum above'],
  },
  'V-23': {
    narrative: "C2 whipsawed both directions then closed below — chaotic price action trapping both sides. C3 swept PDL then reversed above — bulls absorbed everything. C4 ranging — consolidation. Buyers in control after double trap.",
    lossReasons: ['HTF bearish — both whipsaws were distribution', 'C3 reversal above not sustained — sellers reload', 'Confusion in price action — no clear direction', 'PDL break continuation after whipsaw'],
  },
  'V-24': {
    narrative: "C1 broke PDL then closed inside — sellers tried but failed. C2 ranged. C3 broke setup low and held — bears one more push. C4 trending up — reversal beginning. First trade is bearish below C3, then bullish above C3 high.",
    lossReasons: ['Bearish leg extends further than expected', 'C4 trend up is weak — bears reload', 'HTF bearish — no reversal in sight', 'Split scenario — missed the exact transition point'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INSIDE PDR
  // ═══════════════════════════════════════════════════════════════════════════

  'IP-01': {
    narrative: "Price trended down inside PDR. C2 ranged — no seller commitment. C3 broke both C2 and C1 lows — setup low taken, strong bear confirmation. C4 ranging — sellers pausing before continuation. Wait for 7am high to be tapped for entry.",
    lossReasons: ['HTF bullish — setup low sweep is a stop hunt', 'C3 failed to hold below — buyers absorbing', 'PDL already close — limited downside', 'No momentum into C4 range — exhaustion'],
  },
  'IP-02': {
    narrative: "Price trended down or ranging inside PDR. C2 ranged. C3 broke C2 low closing inside — indecision but bearish. C4 broke C3 high and held above — buyers trapped above. Sellers now loading above C4 for aggressive push to PDL.",
    lossReasons: ['C4 high break is genuine continuation up', 'HTF bullish trend intact', 'C3 close inside signals no conviction from bears', 'Buyers stepping in strongly above C4'],
  },
  'IP-03': {
    narrative: "Price trended up inside PDR. C2 swept C1 low — stop hunt below. C3 inside, trending up — buyers absorbed the sweep and loading. C4 broke both C3 and C2 highs — bull momentum confirmed. Entry below 7am low for longs.",
    lossReasons: ['C2 low sweep was genuine — continuation down', 'C4 high break closes inside — weak buyers', 'HTF bearish — pullback rally only', 'No follow-through above C4 high'],
  },
  'IP-04': {
    narrative: "Price trended up inside PDR. C2 broke C1 high — first bull leg. C3 broke C2 high — double confirmation. C4 inside ranging — consolidation. Bulls in control, any dip below 7am low or C2 low is a buy opportunity.",
    lossReasons: ['Double push up — exhaustion at highs', 'C3 and C4 both close inside — distribution', 'HTF resistance cluster above C2 high', 'Sellers defending strongly at current level'],
  },
  'IP-05': {
    narrative: "Price trended up inside PDR. C2 broke C1 high — bull intent. C3 swept both C2 low and setup low — stop hunt below, buyers absorbed. C4 ranging — loading zone. Entry below C3 low gives clean long to PDH.",
    lossReasons: ['C3 break of setup low was genuine — bears in control', 'HTF bearish — C2 break was a distribution setup', 'C4 range breaks down instead', 'Buyers not stepping in after C3 sweep'],
  },
  'IP-06': {
    narrative: "Price trended up inside PDR. C2 broke high and held. C3 and C4 both broke lower and held — sharp reversal. Bulls were trapped above C2 high. Sellers in full control now. Entry above C2 high as last bull trap before descent.",
    lossReasons: ['HTF bullish — C3/C4 drops are just a pullback', 'C3/C4 close below not sustained — bulls reload', 'Support below too strong', 'C2 high acts as demand, not supply'],
  },
  'IP-07': {
    narrative: "Price ranging inside PDR. C2 broke C1 high and held. C3 broke C2 high and PDH — double level taken, strong bull signal. C4 inside ranging — consolidation above PDH. Entry below C4 or 7am low for continuation to 2SD.",
    lossReasons: ['PDH break was a liquidity grab — distribution', 'C3 close inside PDR after PDH break — weak', 'HTF resistance at PDH level', 'C4 range resolves down instead'],
  },
  'IP-08': {
    narrative: "Price trended up inside PDR. C2 broke C1 high — bull intent. C3 inside, ranging — pause. C4 broke both C3 and setup (C2) high — double level confirmation. Bulls stacking momentum. Entry below C1 low for long to PDH.",
    lossReasons: ['C4 break closes inside — weak confirmation', 'HTF bearish — pushes up are retracements', 'Setup high acted as distribution', 'No volume behind C4 break — false move'],
  },
  'IP-09': {
    narrative: "Price ranging inside PDR. C2 swept C1 low and PDL — aggressive stop hunt. C3 broke C2 low inside — continuation down. C4 inside trending down — sellers tired. Bulls entering below C3 low after exhaustion. Target PDH.",
    lossReasons: ['PDL sweep continuation — bears still in control', 'C3/C4 downtrend too strong to reverse', 'HTF bearish trend intact', 'No buying pressure after PDL sweep'],
  },
  'IP-10': {
    narrative: "Price trended down inside PDR. C2 swept C1 low closing inside — bear intent. C3 pushed back above — retracement into bearish order flow. C4 inside ranging — sellers reloading. First FVG after 7am is the entry for shorts.",
    lossReasons: ['C3 push above is stronger than expected — buyers winning', 'HTF bullish — C2 low sweep was just a stop hunt', 'C4 range breaks up — bull continuation', 'No FVG formed clearly after 7am'],
  },
  'IP-11': {
    narrative: "Price ranging inside PDR. C2 swept C1 low — stop hunt. C3 broke setup high and PDH and closed inside — liquidity grabbed above, now distribution. C4 broke C3 high and held — final trap for bulls. Sellers loaded above PDH, now targeting PDL.",
    lossReasons: ['HTF bullish — PDH break was genuine continuation', 'C4 break holds above — bulls stronger than expected', 'No supply above — sellers not present', 'News catalyst driving price through PDH'],
  },
  'IP-12': {
    narrative: "Price trending up or ranging inside PDR. C2 swept C1 high and PDH — bull trap above. C3 broke back below C2 low and setup low — sharp reversal, sellers in control. C4 broke C3 low — continuation. Buyers trapped above PDH.",
    lossReasons: ['HTF bullish — C2/PDH break was genuine', 'C3 reversal not sustained — buyers reload quickly', 'C4 close inside signals exhaustion from bears', 'Support level too strong below setup low'],
  },
  'IP-13': {
    narrative: "Price ranging inside PDR. C2 swept C1 low. C3 pushed back above C2 high. C4 swept C3 low. This triple sweep sequence — lower, higher, lower — is a heavy bear confirmation. Sellers systematically trapping bulls at each swing high.",
    lossReasons: ['Triple sweep is exhaustion — reversal incoming', 'HTF bullish trend absorbing all sells', 'C4 close inside signals final stop hunt not continuation', 'Buyers accumulating on every dip'],
  },
  'IP-14': {
    narrative: "Price trended down inside PDR. C2 swept C1 low — bear intent. C3 pushed above C2 high and held — buyers stepped in. C4 inside ranging — but this is a bear reload. Price will sweep above 7am high to trap bulls then crash to PDL.",
    lossReasons: ['HTF bullish — C3 push above is genuine reversal', 'C4 range resolves up instead of down', 'Buyers too aggressive — bears overwhelmed', 'No supply above 7am high to confirm trap'],
  },
  'IP-15': {
    narrative: "Price ranging inside PDR. C2 swept C1 low and held below — bear leg one. C3 inside ranging — pause. C4 swept C3 low and closed inside — sellers exhausted, failed to hold. Bulls absorbing. First FVG after 7am is the long entry.",
    lossReasons: ['C4 close inside is temporary — bears reload', 'HTF bearish — both sweeps are continuation', 'No FVG forming cleanly after 7am', 'PDL below acting as magnet — bearish continuation'],
  },
  'IP-16': {
    narrative: "Price ranging or trending up inside PDR. C2, C3, and C4 all broke higher — consistent bull momentum stacking candle after candle. Triple push up inside PDR is a strong signal. Any dip below 7am low is a loading opportunity to PDH.",
    lossReasons: ['Triple push up — exhaustion, not continuation', 'HTF resistance above PDR range', 'C4 close inside signals distribution', 'Sellers absorbing each break higher'],
  },
  'IP-17': {
    narrative: "Price ranging inside PDR. C2 swept C1 low — bear intent. C3 pushed above C2 high — retracement. C4 broke C3 and setup high — final liquidity grab above. Bears used this push to distribute. Entry above C4 high targets PDL.",
    lossReasons: ['HTF bullish — C4 high break is genuine continuation', 'Setup high break was demand not supply', 'C3/C4 push higher too strong — bulls winning', 'No selling reaction above C4 high'],
  },
  'IP-18': {
    narrative: "Price ranging inside PDR. C2 swept C1 low and PDL — major stop hunt below prior day. C3 continued lower — extension. C4 pushed back above — dead cat bounce. Sellers heavily positioned. Entry above C4 high targets new lows beyond PDL.",
    lossReasons: ['PDL sweep was the final low — reversal in progress', 'HTF bullish reversal zone at PDL', 'C4 bounce stronger than expected — bull momentum', 'Major support cluster at and below PDL'],
  },
  'IP-19': {
    narrative: "Price ranging inside PDR. C2 and C3 both swept lower closing inside — double dip, sellers trying but failing to hold. C4 broke above and held — buyers finally stepping in. Entry below C3 or 7am low for long to PDH.",
    lossReasons: ['C4 break above closes inside — weak buyers', 'HTF bearish — C2/C3 lows are continuation', 'Double dip structure breaks further down', 'No sustained buying momentum above C4'],
  },
  'IP-20': {
    narrative: "Price ranging or trending up inside PDR. C2 broke C1 high. C3 broke C2 high and held — bull momentum. C4 inside ranging — consolidation. But this is a bear trap setup. Price will sweep above C3 high then reverse sharply to PDL.",
    lossReasons: ['HTF bullish — C3 high break is genuine momentum', 'C4 range resolves up — continuation to PDH', 'Buyers too aggressive above C3 high', 'No distribution signal visible in C4 range'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WHIPSAW
  // ═══════════════════════════════════════════════════════════════════════════

  'W-01': {
    narrative: "Price ranging inside PDR. C2 broke low and held below — bear leg. C3 whipsawed both directions — neither side committed. This indecision after a bearish C2 creates two plays: short on first FVG, then flip long below C3 low if price reverses.",
    lossReasons: ['Whipsaw signals no direction — price stays flat', 'HTF trend overrides both signals', 'First FVG entry fails — no follow-through', 'C3 low holds — reversal play fails too'],
  },
  'W-02': {
    narrative: "Price trended down inside PDR. C2 whipsawed — swept low then reversed above C1 high. C3 broke C2 high and PDH — liquidity stacked above. C4 broke C3 low and held — sharp rejection of highs. Bears loaded on the whipsaw, now in control.",
    lossReasons: ['HTF bullish — C2 whipsaw and C3 PDH break is genuine', 'C4 low break is just a pullback in bull trend', 'Strong demand below C3 low', 'PDH break confirmed — continuation expected'],
  },
  'W-03': {
    narrative: "Price trended up inside PDR. C2 inside, trending down — hesitation. C3 whipsawed — swept C2 low then reversed above C1 high. Buyers and sellers both trapped. C4 inside — calm before storm. Bears loading for first FVG entry.",
    lossReasons: ['HTF bullish — C3 reversal above C1 high is continuation', 'Buyers absorbed both the sweep and the whipsaw', 'C4 resolves up instead', 'No FVG forming cleanly after 7am'],
  },
  'W-04': {
    narrative: "Price trended down inside PDR. C2 whipsawed — swept low then reversed above C1 high, closing above. Bears exhausted on the sweep. C3 broke C2 high and held — bull confirmation. Entry below C3 or 7am low targets PDH.",
    lossReasons: ['HTF bearish — C2 whipsaw was distribution above C1 high', 'C3 break fails to hold — sellers reload', 'Whipsaw signal misleading — bear continuation', 'No buying momentum after C3 break'],
  },
  'W-05': {
    narrative: "C1 whipsawed both PDL and PDH — the full range swept. C2 inside ranging — market digesting the chaos. C3 whipsawed again — swept C1 high then broke below C2 low. Sellers winning the battle. Entry below C1 low targets C3 high.",
    lossReasons: ['Double whipsaw — no clear direction, stay out', 'HTF bullish momentum overriding bear signals', 'C3 close inside not bearish enough', 'C2 low holds after C3 sweep'],
  },
  'W-06': {
    narrative: "Price ranging inside PDR. C2 broke C1 high and held. C3 whipsawed — pushed above C2 high then reversed below setup low. Buyers trapped above. Sellers now in full control. First FVG after 7am is the entry to PDL.",
    lossReasons: ['HTF bullish — C3 whipsaw sweep below is a stop hunt', 'Setup low holds — buyers absorbing', 'C4 resolves up — no bear follow-through', 'Strong demand below setup low'],
  },
  'W-07': {
    narrative: "Price broke PDH and held. C2 continued higher. C3 whipsawed — swept above C2 high then crashed below C2 low — sharp exhaustion. C4 broke C3 low — confirmation. Bulls completely trapped above. Heavy bull momentum entering below.",
    lossReasons: ['HTF bullish — C3 whipsaw is accumulation not distribution', 'C4 low break closes inside — weak bearish signal', 'Strong demand below C2 low holding', 'News driving continuation higher'],
  },
  'W-08': {
    narrative: "Price trended down inside PDR. C2 inside ranging. C3 whipsawed — swept C2 high and setup low, closing below. Double sweep — both buyers and sellers trapped. C4 inside ranging — but bulls loading heavily. Entry below C3 low targets PDH.",
    lossReasons: ['HTF bearish — C3 close below confirms continuation', 'C4 range resolves down — no bull reversal', 'No buying pressure after C3 whipsaw', 'Double sweep exhaustion leads to more selling'],
  },
  'W-09': {
    narrative: "Price trended up inside PDR. C2 whipsawed — swept C1 high then reversed below C1 low. Buyers trapped on the wick. C3 broke C2 low and held — bears confirmed. C4 continued lower. Entry below C4 low targets PDH as bulls eventually return.",
    lossReasons: ['HTF bearish — C2 whipsaw confirms distribution', 'C3/C4 continuation too strong — reversal delayed', 'C4 low break is the final leg — PDL in sight', 'No recovery signal in C4'],
  },
  'W-10': {
    narrative: "Price ranging inside PDR. C2 triple whipsawed — swept low, high, then low again. Maximum confusion, both sides exhausted. C3 swept PDL then reversed above C2 high — bulls absorbed everything. C4 inside. This is a major reversal after triple stop hunt.",
    lossReasons: ['Triple whipsaw means genuine no direction', 'HTF bearish — PDL sweep was a continuation move', 'C3 reversal above not sustained', 'C4 breaks down after ranging'],
  },
  'W-11': {
    narrative: "Price trended down inside PDR. C2 whipsawed — swept C1 low then broke above PDH. C3 and C4 both continued higher. Initially bearish above C4 high, but if price breaks below C2 low — major flip to bullish toward PDH.",
    lossReasons: ['Neither entry level triggers cleanly', 'HTF trend overrides the split scenario', 'C2 low never reached — first trade only', 'C4 high entry fails — bears not present'],
  },
  'W-12': {
    narrative: "Price trended down inside PDR. C2 swept C1 low and PDL — stop hunt. C3 whipsawed — swept below C2 then reversed above C2 high. C4 continued higher. Bulls absorbed everything below PDL and are now in full control. Heavy bull setup.",
    lossReasons: ['PDL sweep was genuine — continuation down', 'HTF bearish trend overriding the reversal', 'C3 reversal above C2 not sustained', 'C4 close inside signals exhaustion from bulls'],
  },
  'W-13': {
    narrative: "Price trended down inside PDR. C2 inside ranging. C3 whipsawed — swept C2 low then reversed above C2 high, closing inside. This is a classic bull trap — the whipsaw lured sellers then rejected them. Entry above C3 high targets PDL on the reversal.",
    lossReasons: ['HTF bearish — C3 whipsaw was distribution above', 'C3 close inside is indecision — no clear direction', 'C4 breaks down — bears in control', 'Buyers not committing above C3 high'],
  },
  'W-14': {
    narrative: "Price broke PDH and held. C2 inside ranging. C3 whipsawed — broke setup high then reversed below C2 low, closing inside setup range. Bulls trapped above. C4 broke C3 low — confirmation. Entry above C4 or 7am high traps the last bulls.",
    lossReasons: ['HTF bullish — C3 whipsaw was a stop hunt below', 'C4 close inside signals no conviction from bears', 'Buyers stepping in below C2 low', 'PDH support holding — no continuation down'],
  },
  'W-15': {
    narrative: "Price broke PDL closing inside — failed bear breakout. C2 broke C1 high and held — reversal confirmed. C3 whipsawed above C2 high then crashed below C2 low — sellers tried but were absorbed. C4 inside ranging — bulls loading. FVG entry to PDH.",
    lossReasons: ['HTF bearish — PDL break and C3 whipsaw is continuation', 'C2 high break was a liquidity grab', 'C4 breaks down — no bull reversal', 'No clean FVG forming after 7am'],
  },
  'W-16': {
    narrative: "Price ranging inside PDR. C2 broke C1 high, closed inside C1. C3 whipsawed — broke above C2 high then crashed below C1 low. Major trap above. C4 broke C3 low and held below PDL — sellers dominant. FVG entry to PDH on eventual reversal.",
    lossReasons: ['HTF bearish — C3/C4 is continuation lower', 'PDL holds below — no new lows forming', 'C4 hold below PDL is exhaustion — reversal incoming', 'No FVG forming cleanly after 7am'],
  },
  'W-17': {
    narrative: "Price ranging inside PDR. C2 whipsawed — swept C1 high then reversed below C1 low, holding below. C3 broke C2 low and held below — and PDL. C4 continued lower. Sellers in aggressive control after faking bulls above. Targeting lower low and 2SD.",
    lossReasons: ['HTF bullish — C2 whipsaw was a stop hunt below', 'PDL holds — reversal instead of continuation', 'C3/C4 extension is overdone — buyers stepping in', 'News catalyst reversing bearish momentum'],
  },
  'W-18': {
    narrative: "Price trended down inside PDR. C2 inside ranging. C3 whipsawed — swept C2 low then reversed above C2 and C1 high. Sellers completely trapped below. C4 continued higher — bull momentum strong. Entry below C3 low targets PDH.",
    lossReasons: ['HTF bearish — C3 reversal above setup high is a trap', 'C4 close inside — buyers not committed', 'Sellers reload above setup high aggressively', 'C3 whipsaw was distribution not reversal'],
  },
  'W-19': {
    narrative: "Price ranging inside PDR. C2 broke C1 high and held. C3 whipsawed — swept below C2 low then reversed back above C2 high. Bears trapped below. C4 continued higher and closed inside — consolidation. FVG entry to PDH on any pullback.",
    lossReasons: ['HTF bearish — C3 whipsaw reversal failed', 'C4 close inside signals exhaustion from bulls', 'Sellers absorbing above C2 high', 'No clean FVG after 7am'],
  },
  'W-20': {
    narrative: "Price broke PDL and held below. C2 swept lower closing inside. C3 whipsawed — broke C2 low then reversed above C2 high. C4 continued above and held. Bulls absorbed the PDL sweep and are now driving price up. Entry below C3 low to PDH.",
    lossReasons: ['HTF bearish — PDL break with C2 continuation dominant', 'C3 reversal not sustained — bears reload', 'C4 close above not committed — sellers return', 'PDL break too aggressive — continuation down'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PDH BREAKS
  // ═══════════════════════════════════════════════════════════════════════════

  'PDH-41': {
    narrative: "Price broke PDH and held. C2 broke C1 low and held below — retracement. C3 whipsawed — swept setup low then reversed above C2 high. Bears tried on the dip but were absorbed. C4 continued higher. Bulls loading for new high.",
    lossReasons: ['HTF resistance cluster above PDH', 'C3 whipsaw reversal not genuine — bears reload', 'C4 high break closes inside — weak signal', 'PDH break was a distribution event'],
  },
  'PDH-42': {
    narrative: "Price broke PDH and held. C2, C3, and C4 all broke higher and held — four consecutive bull candles above PDH. Relentless buying pressure. No seller in sight. Entry below C1 low for any longs — structure is extremely bullish.",
    lossReasons: ['Four consecutive pushes — exhaustion at highs', 'HTF resistance above absorbing momentum', 'Any one candle failing to hold signals reversal', 'News driven spike — not structural momentum'],
  },
  'PDH-43': {
    narrative: "Price broke PDH closing inside. C2 swept C1 low — pullback. C3 broke both C2 and C1 setup high and held — double level recovery, strong bull signal. C4 continued higher — momentum stacking. Entry below C3 low targets new high.",
    lossReasons: ['HTF resistance above new highs', 'C3 high break was a liquidity grab — distribution', 'C4 fails to hold above C3 — reversal starting', 'Setup high break was exhaustion not momentum'],
  },
  'PDH-44': {
    narrative: "Price broke PDH but closed back inside — failed breakout. C2 swept C1 low. C3 continued below — bearish confirmation. C4 inside ranging — sellers loading. Price will push above 7am high to trap any remaining bulls then fall to PDL.",
    lossReasons: ['HTF bullish — PDH close inside was just consolidation', 'C3 below is just a pullback — continuation up expected', 'C4 range resolves up instead', 'Strong support at C2/C3 lows holding'],
  },
  'PDH-45': {
    narrative: "Price broke PDH closing inside. C2 broke C1 high and held — continuation attempt. C3 whipsawed — broke above C2 high then crashed below. C4 broke C3 low and setup low — full reversal confirmed. Sellers trapped everyone above. Target PDL.",
    lossReasons: ['HTF bullish — C3 whipsaw was accumulation below', 'C4 close inside — no bear confirmation', 'Buyers stepping in strongly below C3 low', 'PDH support holding above'],
  },
  'PDH-46': {
    narrative: "Price broke PDH and held. C2 continued higher. C3 whipsawed — pushed above C2 high then fell back inside, closing inside. C4 inside ranging. Bulls likely taking a breather. FVG entry to 1SD. CAUTION — heavy bearishness likely following this move.",
    lossReasons: ['Caution signal confirmed — bearish reversal incoming instead of bull continuation', 'HTF resistance too strong above', 'C3 whipsaw was distribution — reversal before 1SD reached', 'No FVG forming after 7am'],
  },
  'PDH-47': {
    narrative: "Price broke PDH and held. C2 broke C1 high — continuation. C3 swept below C2 and C1 setup low — sharp reversal from highs. C4 broke C3 high — dead cat bounce. Bears loaded at the top. Entry above C4 high traps last bulls. Target PDL.",
    lossReasons: ['HTF bullish — C3 dip was a stop hunt below setup low', 'C4 break above is genuine continuation', 'Buyers absorbing below setup low', 'PDH provides support — no sustained decline'],
  },
  'PDH-48': {
    narrative: "Price broke PDH closing inside. C2 and C3 both broke lower and held — serious reversal. C4 broke back above — conflicting signal. First play is bullish below 7am low, then heavily bearish above C1 high. Two-stage scenario — manage carefully.",
    lossReasons: ['Neither trigger level reached cleanly', 'HTF trend determines which leg wins', 'C4 break above too aggressive — bullish leg only', 'C1 high level never tested — first leg extends'],
  },
  'PDH-49': {
    narrative: "Price broke PDH and held. C2 continued higher. C3 whipsawed — swept above C2 high then crashed below C1 setup low, holding below. Bears tried to reverse the trend. C4 swept C3 low closing inside — buyers absorbed. FVG entry to new highs.",
    lossReasons: ['HTF resistance too strong — C3 reversal below setup low is genuine', 'C4 close inside is exhaustion from bulls', 'No buying momentum forming after C4', 'Bears too aggressive — bull recovery stalls'],
  },
  'PDH-50': {
    narrative: "Price broke PDH and held. C2 and C3 both continued higher and held — three consecutive bull legs above PDH. C4 inside ranging — consolidation. Momentum is undeniable. Entry below 7am low for continuation to new highs.",
    lossReasons: ['Triple push — exhaustion pattern, not continuation', 'HTF resistance above absorbing momentum', 'C4 range resolves down — reversal starting', 'News driven spike losing momentum'],
  },
  'PDH-51': {
    narrative: "Price broke PDH and held. C2 continued higher. C3 whipsawed — swept above C2 high then crashed below C2 low, closing below. C4 swept C3 low closing inside — sellers exhausted temporarily. But entry above 7am high confirms bear continuation to PDL.",
    lossReasons: ['HTF bullish — C3 whipsaw was stop hunt below', 'C4 close inside signals no bear conviction', 'Buyers stepping in below C2 low strongly', 'PDH support absorbing selling pressure'],
  },
  'PDH-52': {
    narrative: "Price broke PDH closing inside. C2 broke C1 low and held below — pullback. C3 whipsawed — swept setup low then reversed back above setup high, closing inside. Sellers tried and failed. C4 inside ranging — bulls reloading. FVG entry to new high.",
    lossReasons: ['HTF resistance above — PDH break was exhaustion', 'C3 whipsaw reversal not sustained', 'C4 breaks down instead of ranging', 'Bears too strong — PDH acting as resistance'],
  },
  'PDH-53': {
    narrative: "Price broke PDH and held. C2 broke C1 high closing inside. C3 swept C2 low closing inside — pullback complete. C4 inside ranging — buyers loading. FVG after 7am is the entry. Structure remains bullish above PDH.",
    lossReasons: ['HTF resistance above PDH level', 'C3 pullback too deep — structure broken', 'C4 range breaks down — no bull continuation', 'No FVG forming clearly after 7am'],
  },
  'PDH-54': {
    narrative: "Price broke PDH and held. C2 inside ranging — consolidation above PDH. C3 swept C2 low closing inside — stop hunt below C2. C4 inside ranging — buyers patient. Entry below C3 or 7am low gives clean long to new highs.",
    lossReasons: ['HTF resistance above', 'C3 close inside is a fake — continuation down', 'C4 breaks down further', 'PDH acting as resistance not support'],
  },
  'PDH-55': {
    narrative: "Price broke PDH closing inside — weak bull attempt. C2 broke C1 high or inside closing inside. C3 broke setup high and held — now above PDH and setup high. But this is a distribution zone. Entry above C3 high traps remaining bulls. Target PDL.",
    lossReasons: ['HTF bullish — C3 high break is genuine continuation', 'No sellers above C3 high — bulls in control', 'PDH provides support — no reversal', 'C3 hold above is momentum not exhaustion'],
  },
  'PDH-56': {
    narrative: "Price broke PDH and held. C2 broke C1 high closing inside. C3 crashed below both C2 and C1 setup low and held — sharp reversal from highs. C4 broke C3 low and PDL — extending the collapse. Entry above C3 high targets new lows. Maximum bearish.",
    lossReasons: ['HTF bullish — C3 drop was a stop hunt', 'PDL holds as major support — reversal', 'C4 close inside after PDL break — exhaustion', 'Buyers absorbing heavily below setup low'],
  },
  'PDH-57': {
    narrative: "Price broke PDH and held. C2 broke C1 high closing inside. C3 swept below C2 and C1 setup low, closing inside — retracement complete. C4 inside ranging — buyers loading below setup low. Entry below 7am low targets new highs or 1SD.",
    lossReasons: ['HTF resistance above PDH too strong', 'C3 close inside setup low is bearish not bullish', 'C4 breaks down instead', 'PDH acting as resistance not a launchpad'],
  },
  'PDH-58': {
    narrative: "Price broke PDH closing inside. C2 broke C1 low and held below — pullback. C3 swept C2 low closing inside — deeper pullback, buyers absorbing. C4 broke both C3 and C2 high, closing above — strong bull recovery. Entry below C3 low to new highs.",
    lossReasons: ['HTF resistance above — C4 break is exhaustion', 'C3 low not yet the bottom — more downside', 'C4 close above is temporary — sellers reload', 'No follow-through above C4 high'],
  },
  'PDH-59': {
    narrative: "Price broke PDH and held. C2, C3 all broke higher and held — relentless bull momentum. C4 broke C3 high but closed inside — exhaustion after four pushes up. Sellers now loading above C4. Entry above C4 high is a distribution trap. Target PDL.",
    lossReasons: ['HTF bullish — C4 close inside is just consolidation before continuation', 'Four pushes are momentum not exhaustion here', 'No sellers above C4 high', 'Strong demand at every pullback'],
  },
  'PDH-60': {
    narrative: "Price broke PDH closing inside. C2 broke C1 high closing inside. C3 broke C2 high and closed above — momentum building. C4 broke C3 high closing inside — four consecutive pushes then close inside. This is classic distribution above PDH. Heavily bearish reversal. Target PDL.",
    lossReasons: ['HTF bullish trend — all four pushes are genuine momentum', 'C4 close inside is just a pause not reversal', 'No supply visible above C4 high', 'News or macro driving continued momentum'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PDL BREAKS
  // ═══════════════════════════════════════════════════════════════════════════

  'PDL-01': {
    narrative: "Price broke PDL closing inside — failed bear breakout. C2 inside ranging. C3 whipsawed — broke C2 and C1 high then swept C2 low closing inside. Buyers and sellers both trapped. C4 broke C3 and setup low — bears trying again. Entry below C4 low targets PDH on reversal.",
    lossReasons: ['HTF bearish — PDL break and C4 low is continuation', 'C4 break below is genuine — new lows coming', 'No buying pressure below PDL', 'C3 whipsaw was distribution not reversal'],
  },
  'PDL-02': {
    narrative: "Price broke PDL closing inside. C2, C3, C4 all broke higher and held — strong recovery from PDL. Price swept PDL to load bulls then pushed aggressively up. But this is a distribution trap above. Entry above C4 high before sellers reverse to new lows.",
    lossReasons: ['HTF bullish — PDL sweep and C2/C3/C4 recovery is genuine reversal', 'Four pushes up are too strong — no reversal', 'PDL acted as final support — continuation to PDH', 'No sellers visible above C4 high'],
  },
  'PDL-03': {
    narrative: "Price broke PDL and held below — strong bear signal. C2 swept C1 low closing inside — continuation. C3 whipsawed — broke C2 high then reversed below C2 low, holding below. C4 swept C3 low closing inside — bears exhausted. FVG entry targets PDH reversal.",
    lossReasons: ['HTF bearish — C3 whipsaw confirms continuation not reversal', 'C4 close inside is temporary — bears reload', 'No buying pressure after C3/C4 sweeps', 'PDH too far — no momentum for reversal'],
  },
  'PDL-04': {
    narrative: "Price broke PDL closing inside — failed bear push. C2 swept C1 high closing inside. C3 and C4 both broke higher and held — strong bull recovery. Sellers trapped below PDL. Entry below C1 low targets PDH and potentially new high.",
    lossReasons: ['HTF bearish — C2/C3/C4 recovery is just a pullback', 'C3/C4 hold above not sustained — sellers reload', 'PDL break was genuine — eventual continuation down', 'HTF resistance above C4 high'],
  },
  'PDL-05': {
    narrative: "Price broke PDL closing inside. C2 inside ranging. C3 broke both C2 and C1 setup high and held — strong bull reversal from PDL. C4 broke C3 high closing inside — continuation attempt. Entry below C3 or 7am low targets 2SD extension up.",
    lossReasons: ['HTF bearish — C3 setup high break was a liquidity grab', 'C4 close inside signals distribution not continuation', 'Sellers absorbing above setup high', 'PDL break was genuine — pullback only'],
  },
  'PDL-06': {
    narrative: "Price broke PDL, holding below. C2 and C3 both continued lower — three consecutive bear legs. C4 broke both C3 and C2 high and held — major recovery. But this is a bull trap. Entry above C4 or 7am high before sellers push to new lows.",
    lossReasons: ['HTF bullish reversal — three pushes down was the bottom', 'C4 recovery too strong — genuine reversal', 'Buyers absorbing at every low', 'New lows never reached — reversal confirmed'],
  },
  'PDL-07': {
    narrative: "Price broke PDL closing inside. C2 inside ranging. C3 whipsawed — swept C2 low then reversed above both C2 and C1 setup high. Bulls absorbed the PDL break and swept all stops below. C4 continued higher. FVG entry or below 7am low targets PDH.",
    lossReasons: ['HTF bearish — C3 whipsaw reversal above setup high is a trap', 'C4 close above is temporary — sellers reload', 'PDL break continuation after whipsaw', 'No sustained buying pressure above setup high'],
  },
  'PDL-08': {
    narrative: "Price broke PDL holding below. C2, C3 all continued lower. C4 broke C3 high and held — looks bearish but caution. This pattern historically precedes a bull reversal. NO ENTRY on this setup. Wait for next day's confirmation. Bulls are coming.",
    lossReasons: ['N/A — this scenario has no entry by design', 'Trading it anyway leads to getting trapped', 'The reversal comes but timing is uncertain', 'Pattern looks bearish but is actually accumulation'],
  },
  'PDL-09': {
    narrative: "Price broke PDL closing inside — failed bear breakout. C2 inside ranging. C3 swept C2 low closing inside — another failed bear push. C4 broke both C3 and setup high and held — bulls taking over. Entry below 7am low targets PDH.",
    lossReasons: ['HTF bearish — C3/C4 is consolidation before continuation down', 'C4 setup high break was a liquidity grab', 'Sellers reload aggressively above setup high', 'PDL break eventual continuation'],
  },
  'PDL-10': {
    narrative: "Price broke PDL closing inside. C2 and C3 both broke higher and held — strong recovery from PDL. C4 broke C3 high and PDH — now above both PDL and PDH on recovery. But this is maximum distribution. FVG entry before sellers collapse price to new lows.",
    lossReasons: ['HTF bullish — PDL sweep and full recovery to PDH is genuine', 'C4 break above PDH is a real bull signal', 'No sellers above PDH — continuation to new highs', 'Major reversal in progress — bulls in full control'],
  },
  'PDL-11': {
    narrative: "Price broke PDL, holding or closing below. C2 swept C1 low closing inside — continuation. C3 swept C2 low and held below — three legs down. C4 inside ranging — bears exhausted. Bulls entering on any dip below 7am low. Target PDH.",
    lossReasons: ['HTF bearish — C4 range resolves down', 'Three legs down with ranging C4 is continuation not reversal', 'No buying pressure after C3 extension', 'PDH too far — no momentum for full reversal'],
  },
  'PDL-12': {
    narrative: "Price broke PDL holding below — strong bear signal initially. C2 inside ranging — bears pausing. C3 broke C2 high and held above — surprise reversal. C4 inside ranging — consolidation above C3 high. Bulls stepping in after PDL sweep. Entry below 7am low targets PDH.",
    lossReasons: ['HTF bearish — C3 break above is just a pullback', 'C4 range resolves down — no bull continuation', 'PDL break too significant — bears reload above C3', 'No sustained demand above C3 high'],
  },
};
