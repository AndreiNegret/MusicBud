Vue.component('rating', {
    template: `
        <div class="rating">
            <slot />
        </div>
    `,
    mounted() {
        Bus.$on('rating:like-action', this.handleLikeAction);
        Bus.$on('rating:dislike-action', this.handleDislikeAction);
    },
    beforeDestroy() {
        Bus.$off('rating:like-action', this.handleLikeAction);
        Bus.$off('rating:dislike-action', this.handledislikeAction);
    },
    computed: {
        emotion() {
            return this.$store.state.emotion;
        },
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        async handleLikeAction() {
            try {
                const data = await axios.post('/Ratings/SubmitFeedBack', { Action: 'like', Emotion: this.emotion, Username: this.user.userName });
            }
            catch (err) {

            }
        },
        async handleDislikeAction() {
            await axios.post('/Ratings/SubmitFeedBack', { Action: 'dislike', Emotion: this.emotion, Username: this.user.userName });
        }
    }
});
