import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import 'chartjs-plugin-annotation';

import { PassportsService } from '../../../@core/data/passports.service';
import { IRule } from '../../../@core/data/rule';
import { RulesService } from '../../../@core/data/rules.service';

/**
 * チャートの各LINEのデータセットインターフェース
 */
interface IDataset {
    scope: string;
    data: number[];
    color: string;
    numberOfIssuedPassports: number;
}

@Component({
    selector: 'waiter-passports-now-chart',
    templateUrl: './passports-now-chart.component.html',
})
export class PassportsNowChartComponent implements OnDestroy {
    rules: IRule[];
    numberOfDatapoints = 60;
    datasets: IDataset[];
    labels4issuedPassports: Date[];
    timers: any[];
    config: NbJSThemeOptions;
    data: {};
    options: any;
    themeSubscription: any;

    constructor(
        private passportsService: PassportsService,
        private rulesService: RulesService,
        private theme: NbThemeService,
    ) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            this.config = config;

            this.rulesService.getAll().subscribe(
                (rules) => {
                    this.rules = rules;

                    this.startMonitoring();
                },
                (err) => {
                    // no op
                },
            );
        });
    }

    ngOnDestroy(): void {
        this.stopTest();
        this.themeSubscription.unsubscribe();
    }

    stopTest() {
        if (this.timers !== undefined) {
            this.timers.forEach((timer) => {
                clearInterval(timer);
            });
        }
    }

    startMonitoring() {
        this.stopTest();
        this.initalizeChart();

        // チャートにデータを追加し続ける
        this.timers.push(setInterval(() => {
            const now = new Date();

            this.labels4issuedPassports.push(now);
            this.labels4issuedPassports = this.labels4issuedPassports.slice(-this.numberOfDatapoints);

            this.datasets.map((dataset, index) => {
                // 時点での発行数データでチャートを更新
                this.datasets[index].data.push(this.datasets[index].numberOfIssuedPassports);
                this.datasets[index].data = this.datasets[index].data.slice(-this.numberOfDatapoints);
            });

            this.updateChart();
        }, 1000));

        // 許可証を発行し続ける
        this.timers.push(setInterval(() => {
            this.datasets.map((dataset, index) => {
                return this.passportsService.getCurrentIssueUnit({
                    scope: dataset.scope,
                }).subscribe(
                    (unit) => {
                        // 時点での発行数データを追加
                        this.datasets[index].numberOfIssuedPassports = unit.numberOfRequests;
                    },
                    (err) => {
                        // no op
                    },
                );
            });
        }, 1000));
    }

    private initalizeChart() {
        const colors: any = this.config.variables;
        const chartjs: any = this.config.variables.chartjs;

        this.timers = [];

        const colorChoices = this.shuffle([
            colors.primary,
            colors.success,
            colors.info,
            colors.warning,
            colors.danger,
        ]);
        this.datasets = this.rules.map((rule, index) => {
            return {
                scope: rule.scope,
                data: [],
                color: colorChoices[index],
                numberOfIssuedPassports: 0,
            };
        });

        this.labels4issuedPassports = [];

        this.options = {
            animation: {
                duration: 0,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: chartjs.textColor,
                },
            },
            hover: {
                mode: 'index',
            },
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        time: {
                            unit: 'seconds',
                            tooltipFormat: 'hh:mm:ss',
                            displayFormats: {
                                seconds: 'hh:mm:ss',
                            },
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '日時',
                        },
                        gridLines: {
                            display: true,
                            color: chartjs.axisLineColor,
                        },
                        ticks: {
                            fontColor: chartjs.textColor,
                        },
                    },
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '発行リクエスト数(個)',
                        },
                        gridLines: {
                            display: true,
                            color: chartjs.axisLineColor,
                        },
                        ticks: {
                            fontColor: chartjs.textColor,
                        },
                    },
                ],
            },
            // 閾値のLINEをセット
            annotation: {
                annotations: this.rules.map((rule, index) => {
                    return {
                        type: 'line',
                        drawTime: 'beforeDatasetsDraw',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: rule.threshold,
                        borderColor: this.datasets[index].color,
                        borderWidth: 4,
                        borderDash: [10, 10],
                    };
                }),
            },
        };
    }

    private updateChart() {
        const colors: any = this.config.variables;

        this.data = {
            labels: this.labels4issuedPassports,
            datasets: this.datasets.map((dataset) => {
                return {
                    label: dataset.scope,
                    data: dataset.data,
                    borderColor: dataset.color,
                    backgroundColor: dataset.color,
                    fill: false,
                    borderDash: [0, 0],
                    pointRadius: 8,
                    pointHoverRadius: 10,
                };
            }),
        };
    }

    private shuffle(array: any[]) {
        let n = array.length;
        let t: number;
        let i: number;

        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }

        return array;
    }
}
