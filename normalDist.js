import Chart from 'chart.js/auto';

export default class NormDist {
    constructor( counts, numOfdice ) {
        this.numOfdice = numOfdice;
        this.counts = counts;
        this.data = new Array(this.numOfdice * 6).fill(0);

        while (counts > 0) {
            this.data[NormDist.sumDice(this.numOfdice) - 1]++;
            counts--;
        }
    }

    static sumDice( nums ) {
        let result = 0;
        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        while (nums > 0) {
            result += random(1, 6)
            nums--
        }
        return result;
    }

    plot() {
        (async function() { 
            const dataPlot = this.data.slice(this.numOfdice - 1);
            new Chart(
              document.getElementById('acquisitions'),
              {
                type: 'bar',
                data: {
                  labels: dataPlot.map((val, idx) => val = idx + 1),
                  datasets: [
                    {
                      label: `Вероятность выпадения, %`,
                      data: dataPlot.map(val => (val * 100) / this.counts)
                    }
                  ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Нормальное распределение'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: `Сумма бросков ${this.numOfdice} кубиков`
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: '%, вероятность выпадения суммы'
                            }
                        }
                    }
                }
              }
            );
          }).call(this);
    }
}