<template>
    <v-container class="text-xs-center">
        <MainView :displayView="displayContentModal" :closeModal="closeModal" :politicianInfo="politicianInfo" :politicianSentiment="politicianSentiment"></MainView>

        <input type="file" name="file" ref="fileInput" class="input-file" @change="handleFileChange" />

        <v-layout row align-center wrap>
            <v-flex xs12 sm12 md5 lg5>
                <v-text-field v-model="politicianName" label="Enter a Name:" name="politicianName" class="red--text">
                </v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md2 lg2>
                <h3 class="grey--text">--OR--</h3>
            </v-flex>
            <v-flex xs12 sm12 md5 lg5>
                <v-layout row wrap align-center>
                    <v-flex xs12 sm6>
                        <v-btn @click.stop="$refs.fileInput.click()" class="red white--text" fluid>
                            <v-icon>file_upload</v-icon>
                            <span>Upload Photo</span>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 sm6 @click.stop="$refs.fileInput.click()">
                        <v-text-field :disabled="true" :label="fileName">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row align-center>
            <v-flex xs12>
                <v-btn @click.stop="searchPoliticianContent" class="green white--text" :loading="loading" :disabled="loading">
                    <span class="main-submit-button">Submit</span>
                    <v-icon>send</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout row justify-center>
            <v-dialog v-model="displayResults">
                <v-card>
                    <v-list>
                        <v-list-tile v-for="result in results" :key="result" @click.stop="getPolitician(result)">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ result }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-dialog>
        </v-layout>

        <v-layout row justify-center>
            <v-dialog v-model="displayRecognisedPoliticianModal">
                <v-card>
                    <v-card-title>
                        <div class="headline grey--text text-xs-center">
                            The person was recognied as <span class="black--text">{{recognizedPolitician}}</span>. Please
                            search for the name for for more information.
                        </div>
                    </v-card-title>
                </v-card>
            </v-dialog>
        </v-layout>

    </v-container>

</template>


<script>
    import {
        getPoliticianSentiment,
        recognizePolitician,
        searchPolitician,
        getPoliticianInfo
    } from './../api/api';
    import {
        nameRegex,
        fileExtensionRegex
    } from './../api/sanitizers';

    import MainView from './MainView';

    export default {
        data() {
            return {
                politicianName: '',
                fileName: 'File name will be displayed here...',
                imageFile: null,

                loading: false,

                results: [],
                displayResults: false,

                politicianInfo: {},
                politicianSentiment: {},
                displayContentModal: false,

                recognizedPolitician: '',
                displayRecognisedPoliticianModal: false
            };
        },
        components: {
            MainView
        },
        methods: {
            handleFileChange(event) {
                this.imageFile = event.target.files[0];
                this.fileName = this.imageFile.name;
            },
            searchPoliticianContent() {
                if (this.politicianName !== '') {
                    if (nameRegex.test(this.politicianName)) {
                        var name = this.politicianName;
                        name = name.replace(/ +/, '-');
                        this.loading = true;

                        searchPolitician(this.politicianName)
                            .then(data => {
                                if (data.error === undefined) {
                                    let politicians = data.map(element => {
                                        return element._source.name;
                                    });
                                    this.results = politicians;
                                    this.displayResults = true;

                                } else
                                    this.$emit('displayMessage', 'error', data.error);

                                this.loading = false;
                            });

                    } else {
                        this.$emit('displayMessage', 'warning', 'Name is invalid');
                    }
                } else {
                    if (!this.imageFile) {
                        this.$emit('displayMessage', 'warning',
                            'Please select a .jpg or .png file OR Enter something to search');
                        return;
                    }

                    var imageFile = this.imageFile;
                    this.imageFile = null;
                    this.fileName = 'File name will be displayed here...';
                    if (fileExtensionRegex.test(imageFile.name) || !imageFile) {
                        this.loading = true;

                        recognizePolitician(imageFile)
                            .then(data => {
                                if (data.error === undefined) {
                                    this.recognizedPolitician = data.name;
                                    this.displayRecognisedPoliticianModal = true;
                                } else
                                    this.$emit('displayMessage', 'error', data.error);

                                this.loading = false;
                            });
                    } else
                        this.$emit('displayMessage', 'warning', 'Invalid file type. Please select a .jpg or .png file');
                }
            },
            getPolitician(name) {
                this.politicianName = '';
                this.displayResults = false;
                this.loading = true;

                getPoliticianInfo(name)
                    .then(data => {
                        if (data.error === undefined) {
                            let sentiment = data[0];
                            let politician = data[1];

                            this.politicianInfo = politician;
                            this.politicianSentiment = sentiment;

                            this.displayContentModal = true;
                        } else
                            this.$emit('displayMessage', 'error', data.error);

                        this.loading = false;
                    })
            },
            closeModal() {
                this.displayContentModal = false;
            }
        }
    }

</script>
