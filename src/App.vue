<template>
    <v-app light>
        <v-snackbar
            :top="true"
            :right="true"
            :success="snackBarType === 'success'"
            :info="snackBarType === 'info'"
            :warning="snackBarType === 'warning'"
            :error="snackBarType === 'error'"
            v-model="displaySnackBar"
        >
            {{ snackBarMessage }}
            <v-btn flat class="white--text" @click.stop="displaySnackBar = false">Close</v-btn>
        </v-snackbar>
        <v-toolbar light class="extra-margin-bottom">
            <v-toolbar-title class="red--text">Logo/Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat>
                    About Us
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <transition name="slide-x-transition">
            <router-view @displayMessage="displayMessage"></router-view>
        </transition>
        <v-footer absolute style="background-color: #fafafa">
        <v-spacer></v-spacer>
        <div class="title" style="padding: 7px">Desgined with 💗 by: Team Saachi</div>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                snackBarType: '',
                snackBarMessage: '',
                displaySnackBar: false
            };
        },
        methods: {
            displayMessage(messageType, message) {
                this.snackBarType = messageType;
                this.snackBarMessage = message;
                this.displaySnackBar = true;
            }
        }
    }

</script>
