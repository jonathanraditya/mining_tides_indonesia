const cliProgress = require('cli-progress');
 
// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
 
// start the progress bar with a total value of 200 and start value of 0
bar1.start(200000000, 0);
 
// update the current value in your application..
for(let i=0; i<100000000; i++){
    bar1.update((200000000/100000000)*i);
}
 
// stop the progress bar
bar1.stop();