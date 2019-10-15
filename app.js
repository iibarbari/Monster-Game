new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns:[]
    },
    methods: {
        startGame() {
            this.gameIsRunning = !this.gameIsRunning;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks(5, 12)
        },
        specialAttack() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster hard for ' + damage
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks(5, 12)
        },
        heal() {
            var that = this;
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player healed for 10'
                })
            } else {
                this.playerHealth = 100;
            }

            
            setTimeout(function () {
                that.monsterAttacks(3, 5);
            }, 100)

        },
        giveUp() {
            this.gameIsRunning = false;
        },
        monsterAttacks(min, max) {
            var damage = this.calculateDamage(min, max);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player ' + damage
            })
            this.checkWin();
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won. New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }

                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost. New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }

                return true;;
            }

            return false;
        }
    }
})
