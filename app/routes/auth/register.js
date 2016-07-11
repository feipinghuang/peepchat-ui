import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  actions: {
    doRegister() {
      this.get('currentModel').save().then(() => {
         this.transitionTo('auth.login');
         this.get('flashMessages').success('Registered! Please login now');
       }).catch((response) => {
         const { errors } = response;
        this.get('flashMessages').danger(errors.mapBy('detail').join(', '));
       });
    }
  },
  model() {
    return this.store.createRecord('user');
  }
});
