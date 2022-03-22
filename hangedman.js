(function () {
    'use strict';

    // The 'word' variable is to store a random word from 'setWord' func, 'guesses' is for the number of remaining guesses, 
    // 'hiddenArray' is for the progress of guessed letters, 'lettersToGuess' is the number of letters left to guess.
    let word, guesses, hiddenArray = [], lettersToGuess, wrongSet = new Set();


    // this function contains all button listeners.
    function buttonListeners() {
        // Main Audio, Mute Button, Reset button, Start Button
        let mainAud = document.getElementById('audio'), muteBut = document.getElementById('muteBut'), reset = document.getElementById('playAgain'), startBut = document.getElementById('startBut');
        let input = document.getElementById('inP');

        // The start game button.
        startBut.addEventListener('click', sta => {
            document.body.removeChild(splash);
            input.focus();
            mainAud.volume = 0.5;
            mainAud.play();
        });

        // The reset game button.
        reset.addEventListener('click', res => {
            mainAud.pause();
            mainAud.currentTime = 0;
            mainAud.play();
            resetGame();
            input.focus();
        });

        // The mute audio button.
        muteBut.addEventListener('click', mut => {
            if (!mainAud.muted) {
                muteBut.innerHTML = '<span>&#x1F507;</span>';
            }
            else {
                muteBut.innerHTML = '<span>&#x1F50A;</span>';
            }
            mainAud.muted = !mainAud.muted;
            input.focus();
        });

        window.addEventListener('keydown', eve => {
            if (eve.key === 'Enter' && document.getElementById('splash')) {
                startBut.click();
            }
            if (!document.getElementById('splash')) {
                input.focus();
            }
            if (eve.key === 'F2') {
                muteBut.click();
            }
            if (eve.key === 'F4') {
                reset.click();
            }
        });
    }


    // init is called for at the end of the program code, it starts everything.
    function init() {
        buttonListeners();

        try {
            figlet('Hanged man', 'Electronic', function (err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                document.getElementById('SplashStr').innerHTML = data;
                startGame();
            });
        }
        catch {

            /* const splashStr = ` ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄        ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄ 
    ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌      ▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌
    ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌     ▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌░▌     ▐░▌
    ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌▐░▌    ▐░▌▐░▌          ▐░▌          ▐░▌       ▐░▌     ▐░▌▐░▌ ▐░▌▐░▌▐░▌       ▐░▌▐░▌▐░▌    ▐░▌
    ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌ ▐░▌   ▐░▌▐░▌ ▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌     ▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌ ▐░▌   ▐░▌
    ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░▌▐░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌     ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌
    ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌   ▐░▌ ▐░▌▐░▌ ▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌     ▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌   ▐░▌ ▐░▌
    ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌    ▐░▌▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌    ▐░▌▐░▌
    ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌     ▐░▐░▌
    ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌      ▐░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌      ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌      ▐░░▌
    ▀         ▀  ▀         ▀  ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀        ▀         ▀  ▀         ▀  ▀        ▀▀ `; */

            // the following encoded string is the above 'splashStr' text (for supporting the use of UTF-8)
            const encodedPt1 = '%20%E2%96%84%20%20%20%20%20%20%20%20%20%E2%96%84%20%20%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%20%20%E2%96%84%E2%96%84%20%20%20%20%20%20%20%20%E2%96%84%20%20%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%20%20%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%20%20%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%20%20%20%20%20%20%20%20%E2%96%84%E2%96%84%20%20%20%20%20%20%20%E2%96%84%E2%96%84%20%20%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%20%20%E2%96%84%E2%96%84%20%20%20%20%20%20%20%20%E2%96%84%20%0A%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%8C%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C',
                encodedPt2 = '%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%8C%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%0A%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%88%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%88%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%20%E2',
                encodedPt3 = '%96%90%E2%96%91%E2%96%88%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%20%E2%96%90%E2%96%91%E2%96%88%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%88%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%91%E2%96%8C%20%20%20%E2%96%90%E2%96%91%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%88%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%0A%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2',
                encodedPt4 = '%96%8C%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%0A%E2%96%90%E2%96%91%E2%96%88%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%88%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%20%E2%96%90%E2%96%91%E2%96%88%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%E2%96%90%E2%96%91%E2%96%90%E2%96%91%E2%96%8C%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%88%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96',
                encodedPt5 = '%84%E2%96%84%E2%96%84%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%E2%96%90%E2%96%91%E2%96%8C%0A%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%E2',
                encodedPt6 = '%96%90%E2%96%91%E2%96%8C%20%20%E2%96%90%E2%96%91%E2%96%8C%0A%E2%96%90%E2%96%91%E2%96%88%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%88%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%88%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%E2%96%80%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%88%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%E2%96%90%E2%96%91%E2%96%8C%0A%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20',
                encodedPt7 = '%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%0A%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%88%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%88%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96',
                encodedPt8 = '%88%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%20%E2%96%90%E2%96%91%E2%96%88%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%84%E2%96%88%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%90%E2%96%91%E2%96%8C%0A%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%91%E2%96%8C%20%20%20',
                encodedPt9 = '%20%20%20%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%8C%E2%96%90%E2%96%91%E2%96%8C%20%20%20%20%20%20%E2%96%90%E2%96%91%E2%96%91%E2%96%8C%0A%20%E2%96%80%20%20%20%20%20%20%20%20%20%E2%96%80%20%20%E2%96%80%20%20%20%20%20%20%20%20%20%E2%96%80%20%20%E2%96%80%20%20%20%20%20%20%20%20%E2%96%80%E2%96%80%20%20%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%20%20%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%20%20%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%E2%96%80%20%20%20%20%20%20%20%20%E2%96%80%20%20%20%20%20%20%20%20%20%E2%96%80%20%20%E2%96%80%20%20%20%20%20%20%20%20%20%E2%96%80%20%20%E2%96%80%20%20%20%20%20%20%20%20%E2%96%80%E2%96%80%20';

            let splashStr = decodeURIComponent(encodedPt1 + encodedPt2 + encodedPt3 + encodedPt4 + encodedPt5 + encodedPt6 + encodedPt7 + encodedPt8 + encodedPt9);

            document.getElementById('SplashStr').innerHTML = splashStr;
            startGame();
        }
    }


    function startGame() {
        //resets all game variables and settings for the start.
        resetGame();

        // prepares input box and mainAudio variables to work with.
        let input = document.getElementById('inP'), mainAud = document.getElementById('audio');
        let wrongGuesses = document.getElementById('wrongGuesses');

        // eventListener for the input bar. waits for an Enter press.
        input.addEventListener('keydown', ev => {
            if (ev.code !== undefined) {
                if (ev.code.includes('Enter')) {
                    // after pressed Enter stores the value read from input in a variable and resets the input bar value.
                    let inputVal = input.value;
                    input.value = '';

                    // if the input is legal (only letters) &&AND its either same length as the word (for whole word guess atempt) ||or its 1 letter.
                    if (inputVal.match(/^[a-z]+$/i) && (inputVal.length === word.length || inputVal.length === 1)) {
                        // checkGuess checks the guess and updates the variables accordingly.
                        let result = checkGuess(inputVal.toLowerCase());
                        // wrong guess or right or already guessed ?
                        if (result === 0) {
                            if (guesses === 9) {
                                document.getElementById('wrongGuesses').innerHTML = '<span id="wrong">Wrong Guesses:<br></span>';
                            }
                            if (!wrongSet.has(inputVal)) {
                                wrongGuesses.innerHTML += inputVal + ' ';
                                wrongSet.add(inputVal);
                            }
                            // updates the canvas drawing.
                            draw(guesses);
                            setNewMsg(inputVal.toLowerCase());
                        }
                        else if (result === 1) {
                            setNewMsg(inputVal.toLowerCase());
                        }
                        else {
                            document.getElementById('yourGuess').innerHTML = `Already tried "${inputVal}" !`;
                        }

                        // check if the game is over.
                        if (lettersToGuess === 0 || guesses === 0) {
                            // hides the input bar.
                            input.style = 'display: none;'
                            if (guesses < 6) {
                                draw(11);
                            }

                            mainAud.pause();
                            //check to see if the game is muted to decide to play the ending audio or not.
                            if (!mainAud.muted) {
                                let endingAudio = new Audio();
                                if (!guesses) {
                                    endingAudio.src = 'https://vgmsite.com/soundtracks/super-mario-sunshine-game-rip/yhapvkgnhb/14.%20Too%20Bad%21.mp3';
                                }
                                else {
                                    endingAudio.src = 'https://vgmsite.com/soundtracks/super-mario-sunshine-game-rip/ostgeoxhpv/76.%20Ending.mp3';
                                }
                                endingAudio.volume = 0.5;
                                endingAudio.play();
                            }
                        }
                    }
                    else {
                        // else if the input is invalid.
                        alert('The guess is Invalid!');
                    }
                }
            }
        });
    }


    // this is to initialize all variables, at the start or if the reset game button is pressed.
    function resetGame() {
        //no need to do this if the reset was before any failed guess.
        if (guesses < 10) {
            // clears canvas drawing.
            var canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('wrongGuesses').innerHTML = '';
            wrongSet = new Set();
        }

        // if got here after a gameover.
        if (document.getElementById('inP').style.display === 'none') {
            document.getElementById('inP').style = 'display: true;';
            document.getElementById('yourGuess').style = `color: $#f91af6;`;
            document.getElementById('question').innerHTML = 'What is your guess?';
        }

        word = setWord();
        guesses = 10;
        hiddenArray = [];
        lettersToGuess = word.length;
        for (let i = 0; i < word.length; i++) {
            hiddenArray.push('*');
        }
        setNewMsg('<br>');
    }


    // updates the game text after each try
    function setNewMsg(guess) {
        // three parts, 1) is the remianing guesses, 2) is the hidden word(*) and 3) is the guess/ending message
        let message1 = document.getElementById('RG'), message2 = document.getElementById('hidden'), message3 = document.getElementById('yourGuess');

        message1.innerHTML = `You have ${guesses} guesses`;
        message3.innerHTML = `${guess}`;
        // if the game is over prints a suitable message.
        if (lettersToGuess === 0 || guesses === 0) {
            let text = `Too Bad, No More Attempts To guess!`, color = 'red';
            // is the game over due to a win or due to insufficient attempts ?
            if (!lettersToGuess) {
                color = 'green';
                text = `Great Job! You Have Successfully Guessed The Word.`;
            }
            message3.style = `color: ${color}; margin-top: 45px;`;
            message3.innerHTML = `${text}`;
            hiddenArray = word.split('');
            document.getElementById('question').innerHTML = '';
        }
        message2.innerHTML = `${hiddenArray.join('')}`;
    }


    function checkGuess(guess) {
        if (wrongSet.has(guess)) {
            return 3;
        }
        // if the guess is 1 letter
        if (guess.length === 1) {
            // checks if it has already been guessed to do nothing.
            if (hiddenArray.includes(guess)) {
                return 3;
            }
            // else checks if it is a wrong guess.
            else if (word.indexOf(guess) === -1) {
                guesses--;
                draw(guesses);
                return 0;
            }
            // else then the letter is guessed and updates the array n lettersToGuess.
            else {
                for (let i = 0, j = word.length; i < j; i++) {
                    if (word[i] === guess) {
                        hiddenArray[i] = guess;
                        lettersToGuess--;
                    }
                }
            }
        }
        // else if the guess is same length as the word then, check if it matches.
        else if (guess === word) {
            lettersToGuess = 0;
        }
        else {
            guesses--;
            draw(guesses);
            return 0;
        }
        return 1;
    }


    // updates canvas drawing after each failed attempt
    function draw(x) {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            switch (x) {
                case 10:
                    break;
                case 9: // foundation
                    ctx.moveTo(60, 130);
                    ctx.lineTo(96, 130);
                    ctx.lineTo(96, 132);
                    ctx.lineTo(60, 132);
                    ctx.fill();
                    break;
                case 8: //  pole
                    ctx.moveTo(79, 25);
                    ctx.lineTo(79, 130);
                    ctx.lineTo(77, 130);
                    ctx.lineTo(77, 25);
                    ctx.fill();
                    break;
                case 7: //  roof
                    ctx.moveTo(77, 25);
                    ctx.lineTo(150, 25);
                    ctx.lineTo(150, 23);
                    ctx.lineTo(77, 23);
                    ctx.fill();
                    break;
                case 6: //  rope
                    ctx.moveTo(150, 25);
                    ctx.lineTo(150, 40);
                    ctx.lineTo(148, 40);
                    ctx.lineTo(148, 25);
                    ctx.fill();
                    break;
                case 5: //  head
                    ctx.arc(149, 50, 10, 0, Math.PI * 2, true);
                    ctx.strokeStyle = 'rgb(0, 0, 0)';
                    ctx.stroke();
                    break;
                case 4: //  body
                    ctx.moveTo(150, 60);
                    ctx.lineTo(150, 90);
                    ctx.lineTo(148, 90);
                    ctx.lineTo(148, 60);
                    ctx.fill();
                    break;
                case 3: //  left hand
                    ctx.moveTo(148, 72);
                    ctx.lineTo(135, 72);
                    ctx.lineTo(132, 60);
                    ctx.lineTo(134, 60);
                    ctx.lineTo(137, 70);
                    ctx.lineTo(148, 70);
                    ctx.fill();
                    break;
                case 2: //  right hand
                    ctx.moveTo(150, 68);
                    ctx.lineTo(163, 70);
                    ctx.lineTo(160, 82);
                    ctx.lineTo(158, 82);
                    ctx.lineTo(161, 72);
                    ctx.lineTo(150, 70);
                    ctx.fill();
                    break;
                case 1: //  left leg
                    ctx.moveTo(149, 90);
                    ctx.lineTo(136, 92);
                    ctx.lineTo(139, 106);
                    ctx.lineTo(135, 109);
                    ctx.lineTo(135, 111);
                    ctx.lineTo(141, 106);
                    ctx.lineTo(138, 94);
                    ctx.lineTo(149, 92);
                    ctx.fill();
                    break;
                case 0: //  right leg
                    ctx.moveTo(149, 90);
                    ctx.lineTo(158, 98);
                    ctx.lineTo(152, 108);
                    ctx.lineTo(156, 111);
                    ctx.lineTo(156, 113);
                    ctx.lineTo(154, 111);
                    ctx.lineTo(156, 98);
                    ctx.lineTo(149, 92);
                    ctx.fill();
                    break;
                default:
                    ctx.moveTo(155, 47);
                    ctx.arc(153, 47, 2, 0, Math.PI * 2, true);  //  Left eye
                    ctx.moveTo(147, 47);
                    ctx.arc(145, 47, 2, 0, Math.PI * 2, true);  //  Right eye
                    if (lettersToGuess === 0) {
                        ctx.moveTo(154, 51);
                        ctx.arc(149, 51, 5, 0, Math.PI, false); //  Win mouth
                        ctx.strokeStyle = 'rgb(0, 255, 0)';  //  Win = Green
                    }
                    else {
                        ctx.moveTo(154, 56);
                        ctx.arc(149, 56, 5, 0, Math.PI, true);  // Loose mouth
                        ctx.strokeStyle = 'rgb(255, 0, 0)';  //  Loose = Red
                    }
                    ctx.stroke();
                    break;
            }
        }
    }


    // picks a word to guess from an array of words.
    function setWord() {
        let words = ["javascript", "appleseeds", "fullstack", "code", "hightech",
            "homework", "exciting", "function", "developer", "html"];
        return words[Math.floor(Math.random() * words.length)];
    }


    // game starts here on window load.
    window.addEventListener('load', () => {
        init();
    });


})();
