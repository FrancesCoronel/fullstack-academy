var gameOfLife = {
    width: 12,
    height: 12,
    stepInterval: 1000,
    isPlaying: false,

    createAndShowBoard: function() {
        // create <table> element
        var goltable = document.createElement("tbody");

        // build Table HTML
        var tablehtml = '';
        for (var h = 0; h < this.height; h++) {
            tablehtml += "<tr id='row+" + h + "'>";
            for (var w = 0; w < this.width; w++) {
                tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
            }
            tablehtml += "</tr>";
        }
        goltable.innerHTML = tablehtml;

        // add table to the #board element
        var board = document.getElementById('board');
        board.appendChild(goltable);

        // refactor
        this.board = board;

        // once html elements are added to the page, attach events to them
        this.setupBoardEvents();
    },

    forEachCell: function(iteratorFunc) {
        /*
          Write forEachCell here. You will have to visit
          each cell on the board, call the "iteratorFunc" function,
          and pass into func, the cell and the cell's x & y
          coordinates. For example: iteratorFunc(cell, x, y)
        */
        for (var x = 0; x < this.height; x++) {
            for (var y = 0; y < this.width; y++) {
                iteratorFunc(document.getElementById(x + "-" + y), x, y);
            }
        }
        // refactored solution
        var cells = document.getElementsById('board').getElementsByTagName('td');
        for (var i = 0; i < cells.length; i++) {
            var xy = cells[i].id.split('-');
            var x = parseInt(xy[0]);
            var y = parseInt(xy[1]);
            iteratorFunc(cells[i]);
        }

    },

    setupBoardEvents: function() {
        // each board cell has an CSS id in the format of: "x-y"
        // where x is the x-coordinate and y the y-coordinate
        // use this fact to loop through all the ids and assign
        // them "on-click" events that allow a user to click on
        // cells to setup the initial state of the game
        // before clicking "Step" or "Auto-Play"

        // clicking on a cell should toggle the cell between "alive" & "dead"
        // for ex: an "alive" cell be colored "blue", a dead cell could stay white
        document.getElementById('step_btn').onclick = this.step.bind(this);
        document.getElementById('play_btn').onclick = this.enableAutoPlay.bind(this);
        document.getElementById('reset_btn').onclick = this.reset.bind(this);
        document.getElementById('clear_btn').onclick = this.clear.bind(this);

        var toggleCell = function() {
            if (this.getAttribute('data-status') === 'dead') {
                // this.className = "alive";
                this.setAttribute({
                    'data-status': 'alive',
                    'class': 'alive'
                });
            } else {
                // this.className = "dead";
                this.setAttribute({
                    'data-status': 'dead',
                    'class': 'dead'
                });
            }
        };

        // EXAMPLE FOR ONE CELL
        // Here is how we would catch a click event on just the 0-0 cell
        // You need to add the click event on EVERY cell on the board

        var onCellClick = function() {
            // QUESTION TO ASK YOURSELF: What is "this" equal to here?
            // how to set the style of the cell when it's clicked
            if (this.getAttribute('data-status') === 'dead') {
                this.className = "alive";
                this.setAttribute('data-status', 'alive');
            } else {
                this.className = "dead";
                this.setAttribute('data-status', 'dead');
            }
        };

        // best solution - yay

        this.forEachCell(function(cell, x, y) {
            cell.onclick = onCellClick;
        });

        // to invoke step function
        document.getElementById('step_btn').onclick = this.step.bind(this);

    },

    step: function() {
        // Here is where you want to loop through all the cells
        // on the board and determine, based on it's neighbors,
        // whether the cell should be dead or alive in the next
        // evolution of the game.
        //
        // You need to:
        // 1. Count alive neighbors for all cells
        // 2. Set the next state of all cells based on their alive neighbors
        // helper functions (get alive neighbors, get dead neighbors, etc.)

        // alternative solution
        var toToggle = [];

        this.forEachCell(function(cell, cellX, cellY) {
            var neighbors = [];
            for (var x = cellX - 1; x < cellX + 1; x++) {
                for (var y = cellY - 1; y < cellY + 1;y++) {
                    if (cellX !== x || cellY !== y) {
                        var n = document.getElementById(x + '-' + y);
                        if (n) {
                            neighbors.push(n);
                        }
                        console.log(neighbors);
                    }
                }
            }

            var liveNeighbors = neighbors.reduce(function (sum, cell) {
                var increment = cell.getAttribute('data-status') === 'alive' ? 1: 0;
                return currentSum + increment;
            }, 0);

            if (cell.getAttribute('data-status') === 'alive') {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    toToggle.push(cell);
                }
                else {
                    if (liveNeighbors === 3) {
                        toToggle.push(cell);
                    }
                }
            }
        });

        toToggle.forEach(function (cell) {
            if (cell.getAttribute('data-status') === 'dead') {
                cell.className = "alive";
                cell.setAttribute('data-status', 'alive');
            } else {
                cell.className = "dead";
                cell.setAttribute('data-status', 'dead');
            }
        });

        // function countAlive(cell, x, y) {
        //     var numAlive = 0;
        //     this.forEachCell(function(cell, xx, yy) {
        //         if(Math.abs(xx - x) <= 1 && Math.abs(yy - y) <= 1) {
        //             if(xx === x || yy === y) {
        //                 return;
        //             }
        //             if(this.getAttribute('data-status') === 'alive') {
        //             numAlive++;
        //             }
        //         }
        //     });
        //     return numAlive;
        // }

        // function setState(cell, x, y) {
        //     var alive = countAlive(cell, x, y);
        //     if(alive === 2 || alive === 3) {
        //        //this cell lives to next gen
        //     }
        //     if(alive < 2) {
        //        //this cell dies before next gen
        //     }
        //     if(alive > 3) {
        //         //this cell dies before next gen
        //     }
        //     if(cell is dead && alive === 3) {
        //         //this cell becomes alive
        //     }

        // }

        // this.forEachCell(function(cell, x, y){
        //     setState(cell, x, y);
        // });

    },

    clear: function() {
        var interclear = function() {
            if (this.getAttribute('data-status') === 'alive') {
                this.className = "dead";
                this.setAttribute('data-status', 'dead');
            } else {
                return;
            }
        };
        this.forEachCell(function(cell, x, y) {
            // interclear.bind(cell)();
            // cals function on arguments provided as array
            interclear.apply(cell);
        });
    },

    enableAutoPlay: function() {
        // Start Auto-Play by running the 'step' function
        // automatically repeatedly every fixed time interval
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },

    play: function() {
        this.isPlaying = true;
        var playButton = document.getElementById('play_btn');
        playButton.textContent = 'Pause';
        playButton.classList.add('btn-danger');
        playButton.classList.remove('btn-primary');
        this.intervalID = setInterval(this.step.bind(this), this.stepInterval);
    },

    pause: function() {
        this.isPlaying = false;
        var playButton = document.getElementById('play_btn');
        playButton.textContent = 'Play';
        playButton.classList.add('btn-primary');
        playButton.classList.remove('btn-danger');
        // setInterval(this.step.bind(this), stepInterval);
        clearInterval(this.intervalID);
    }

};

gameOfLife.createAndShowBoard();