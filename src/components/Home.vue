<template>
    <v-container class="text-xs-center">
        <MainView :displayView="displayContentModal" :closeModal="closeModal"></MainView>
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
                        <v-btn @click.stop="uploadPhoto" class="red white--text" fluid>
                            <v-icon>file_upload</v-icon>
                            <span>Upload Photo</span>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field :disabled="true" :label="fileName">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row align-center>
            <v-flex xs12>
                <v-btn @click.stop="getPoliticianContent" class="green white--text" :loading="loading" :disabled="loading">
                    <span class="main-submit-button">Submit</span>
                    <v-icon>send</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout row align-center>
            <v-flex xs12>
                <v-btn @click.stop="displayContentModal = true" class="red white--text">
                    <span class="main-submit-button">Open</span>
                    <v-icon>home</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>

</template>


<script>
    import {
        getPoliticianSentiment,
        recognizePolitician
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
                displayContentModal: false
            };
        },
        components: {
            MainView
        },
        methods: {
            uploadPhoto() {
                this.$refs.fileInput.click();
            },
            handleFileChange(event) {
                this.imageFile = event.target.files[0];
                this.fileName = this.imageFile.name;
            },
            getPoliticianContent() {
                if (this.politicianName !== '') {
                    if (nameRegex.test(this.politicianName)) {
                        var name = this.politicianName;
                        name = name.replace(/ +/, '-');
                        this.loading = true;

                        getPoliticianSentiment(name)
                            .then(data => {
                                if (data.error === undefined) {
                                    console.log(data);
                                } else
                                    this.$emit('displayMessage', 'error', data.error);

                                this.loading = false;
                            });
                    } else {
                        this.$emit('displayMessage', 'warning', 'Name is invalid');
                    }
                } else {
                    var imageFile = this.imageFile;
                    this.imageFile = null;
                    this.fileName = 'File name will be displayed here...';
                    if (fileExtensionRegex.test(imageFile.name)) {
                        this.loading = true;

                        recognizePolitician(imageFile)
                            .then(data => {
                                if (data.error === undefined) {
                                    console.log(data);
                                } else
                                    this.$emit('displayMessage', 'error', data.error);

                                this.loading = false;
                            });
                    } else
                        this.$emit('displayMessage', 'warning', 'Invalid file type. Please select a .jpg or .png file');
                }
            },
            closeModal() {
                this.displayContentModal = false;
            }
        }
    }

</script>
