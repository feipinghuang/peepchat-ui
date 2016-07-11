import Ember from 'ember';
const { inject } = Ember;

export default Ember.Route.extend({
  session: inject.service(),
  flashMessages: inject.service(),

  actions: {
    doLogin() {
      const user = this.get('currentModel');
      this.get('session').authenticate(
        'authenticator:peepchat',
        user.email,
        user.password
      ).then(() => {
        this.get('flashMessages').success('Logged in!');
      }).catch((response) => {
        const { errors } = response;
        if (errors.mapBy('code').indexOf(401) >= 0) {
          // Unauthorized
          this.get('flashMessages')
            .danger('There was a problem with your username or password, please try again');
          console.log(this.get('flashMessages.arrangedQueue'));
        } else {

          // All other API errors
          this.get('flashMessages').danger('Server Error');

        }
      });
    }
  },

  model() {
    return {
      email: '',
      password: ''
    };
  }
});
