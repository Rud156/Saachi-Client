<template>
    <v-layout row justify-center>
        <v-dialog v-model="displayModal" fullscreen transition="dialog-bottom-transition" :overlay="false">
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat icon @click.stop="closeModal" class="red--text">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-card-title>
                    <div class="text-xs-center" style="width: 100%;">
                        <div class="display-1 extra-margin">A.S.KARIBASAPPA</div>

                        <v-layout row wrap class="title extra-margin">
                            <v-flex xs12 sm4 class="extra-margin">Age: 35</v-flex>
                            <v-flex xs12 sm4 class="extra-margin">Liabilities: Rs. 35,000</v-flex>
                            <v-flex xs12 sm4 class="extra-margin">Party: SUP</v-flex>
                        </v-layout>

                        <v-layout row wrap class="title extra-margin">
                            <v-flex xs12 sm6 class="extra-margin">Location: Jagalur (DAVANAGERE)</v-flex>
                            <v-flex xs12 sm6 class="extra-margin">Also Known As: Shree.Sangappa</v-flex>
                        </v-layout>

                        <v-layout row wrap class="title extra-margin">
                            <v-flex xs12>Assets: Rs 3,60,000</v-flex>
                        </v-layout>

                        <v-layout row wrap class="title extra-margin">
                            <v-flex xs12>Address: Davangere Tq, Gummanoor village</v-flex>
                        </v-layout>

                        <v-layout class="title extra-margin" row wrap>
                            <v-flex xs12>
                                <div style="max-width: 600px; width: 100%; margin: 0 auto">
                                    <canvas ref="pieChart"></canvas>
                                </div>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap class="title extra-margin">
                            <v-flex xs12 sm6 class="extra-margin">
                                <div class="title extra-margin">Crimes</div>
                                <v-list>
                                    <v-list-tile v-for="(item, index) in crimes" @click="" :key="index">
                                        <v-list-tile-content>
                                            <div class="grey--text text--darken-1 text-xs-center" style="width: 100%">{{ item }}</div>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-flex>
                            <v-flex xs12 sm6 class="extra-margin">
                                <div class="extra-margin title">Education</div>
                                <v-list>
                                    <v-list-tile v-for="(item, index) in education" @click="" :key="index">
                                        <v-list-tile-content>
                                            <div class="grey--text text--darken-1 text-xs-center" style="width: 100%">{{ item }}</div>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-card-title>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>
    import Chart from 'chart.js';

    export default {
        props: {
            displayView: {
                type: Boolean,
                required: true
            },
            closeModal: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                displayModal: false,
                chartData: {
                    labels: ["Negative", "Positive"],
                    datasets: [{
                        label: 'Sentiment',
                        data: [43, 57],
                        backgroundColor: [
                            'red',
                            'green'
                        ]
                    }]
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        position: 'top',
                        text: 'Sentiment',
                        fontSize: 25
                    }
                },
                pieChart: null,
                education: [
                    "12th Pass",
                    " P.U. KMA, ARTS COLLEGE 1981"
                ],
                crimes: [
                    " 1 charges related to Punishment for Defamation (IPC Section-500)"
                ]
            }
        },
        watch: {
            displayView(updatedValue) {
                this.displayModal = updatedValue;
            }
        },
        mounted() {
            this.pieChart = new Chart(this.$refs.pieChart, {
                type: 'pie',
                data: this.chartData,
                options: this.chartOptions
            });
        }
    }

</script>
