Vue.component('rating', {
    template: `
        <div class="rating">
            <slot :pickedTrack="pickedTrack" :action="action" />
        </div>
    `,
    mounted() {
        Bus.$on('rating:like-action', this.handleLikeAction);
        Bus.$on('rating:dislike-action', this.handleDislikeAction);
        Bus.$on('modal:ok', this.reset);
    },
    beforeDestroy() {
        Bus.$off('rating:like-action', this.handleLikeAction);
        Bus.$off('rating:dislike-action', this.handledislikeAction);
        Bus.$off('modal:ok', this.reset);
    },
    computed: {
        emotion() {
            return this.$store.state.emotion;
        },
        user() {
            return this.$store.state.user;
        }
    },
    data() {
        return {
            action: null,
            pickedTrack: null
        }
    },
    methods: {
        async handleLikeAction() {
            try {
                this.action = 'like';
                const { data } = await axios.post('/Ratings/SubmitFeedBack', { Action: 'like', Emotion: this.emotion, Username: this.user.userName });
                this.pickedTrack = data;
            }
            catch (err) {

            }
        },
        async handleDislikeAction() {
            this.action = 'dislike';
            await axios.post('/Ratings/SubmitFeedBack', { Action: 'dislike', Emotion: this.emotion, Username: this.user.userName });
        },
        reset() {
            this.action = null;
            this.pickedTrack = null;
        }
    }
});
