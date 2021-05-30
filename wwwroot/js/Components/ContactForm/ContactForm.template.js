/// reference path="axios"

const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1);

Vue.component('contact-form', {
    template: `
        <div class="contact-form form-overlay" :class="{ 'show-form-overlay': isExpanded }">
            <div id="form-container" :class="{ 'expand': isExpanded, 'form-submitted': isFormSubmitted }">
                <span class="form-controls" @click="toggleExpanded">
                    <i class="fa fa-window-close" v-if="isExpanded" @click="resetForm"></i> 
                    <i class="fas fa-pencil-alt" v-else>
                </span>
                <div id="form-content" v-show="isExpanded" :class="{ 'show-form-overlay expand': isExpanded }" >
                    <div id="form-head" >
                        <h1 class="pre">Get in touch</h1>
                        <p class="pre">Good choice...</p>
                        <h1 class="post">Thanks!</h1>
                        <p class="post">I'll be in touch ASAP</p>
                    </div>
                    <form @submit.prevent="submitForm">
                        <input class="input name" :class="{'form-error': !form.fields.name.isValid}" name="name" placeholder="Your name please" type="text" v-model="form.fields.name.value" required>
                        <input class="input email" :class="{'form-error': !form.fields.email.isValid}" name="email" placeholder="A contact email" type="email" v-model="form.fields.email.value" required>
                        <select v-model="form.fields.option.value" class="input select" name="subject">
                            <option disabled>What shall we talk about?</option>
                            <option>About potential help?</option>
                            <option selected>Giving a feedback?</option>
                            <option>Used technologies?</option>
                            <option>Other</option>
                        </select>
                        <textarea class="input message" :class="{'form-error': !form.fields.message.isValid}" placeholder="How can I help?" v-model="form.fields.message.value" required></textarea>
                        <input class="input submit" type="submit" value="Send Message">
                    </form>
                </div>
           </div>`,
    data() {
        return {
            isExpanded: false,
            form: {
                fields: {
                    name: {
                        type: 'text',
                        value: '',
                        isValid: true
                    },
                    option: {
                        type: 'select',
                        value: 'Giving a feedback?',
                        isValid: true
                    },
                    email: {
                        type: 'email',
                        value: '',
                        isValid: true
                    },
                    message: {
                        type: 'text',
                        value: '',
                        isValid: true
                    }
                },
                isValid: false
            },
            isFormSubmitted: false
        }
    },
    methods: {
        toggleExpanded() {
            this.isExpanded = !this.isExpanded;
        },
        isValidEmail(email) {
            const pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return pattern.test(email);
        },
        resetForm() {
            this.form = {
                fields: {
                    name: {
                        type: 'text',
                        value: '',
                        isValid: true
                    },
                    option: {
                        type: 'select',
                        value: 'Giving a feedback?',
                        isValid: true
                    },
                    email: {
                        type: 'email',
                        value: '',
                        isValid: true
                    },
                    message: {
                        type: 'text',
                        value: '',
                        isValid: true
                    }
                },
                isValid: false
            };
            this.isFormSubmitted = false;
        },
        async submitForm() {
            const isValid = true;

            for (const key in this.form.fields) {
                const field = this.form.fields[key];
                if (field.value === '' || (field.type == 'email' && !this.isValidEmail(field.value))) {
                    field.isValid = false;
                    isValid = false;
                } 
            }

            this.form.isValid = isValid;

            const formData = {};

            const formFields = this.form.fields;

            for(const key in formFields) {
                const newKey = capitalize(key);
                formData[newKey] = formFields[key].value;
            }
            
            // send data to the server
            try {
                await axios.post('/Contacts/SubmitMessage', formData);
                this.resetForm();
                this.isFormSubmitted = true;
            } catch(err) {

            }
        }
    }
});