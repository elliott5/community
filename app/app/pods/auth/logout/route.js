// Copyright 2016 Documize Inc. <legal@documize.com>. All rights reserved.
//
// This software (Documize Community Edition) is licensed under 
// GNU AGPL v3 http://www.gnu.org/licenses/agpl-3.0.en.html
//
// You can operate outside the AGPL restrictions by purchasing
// Documize Enterprise Edition and obtaining a commercial license
// by contacting <sales@documize.com>. 
//
// https://documize.com

import Ember from 'ember';
import config from 'documize/config/environment';

export default Ember.Route.extend({
	session: Ember.inject.service(),
	appMeta: Ember.inject.service(),

	activate: function () {
		this.get('session').invalidate();
		this.audit.record("logged-in");
		this.audit.stop();

		if (config.environment === 'test') {
			this.transitionTo('auth.login');
		} else {
			window.document.location = this.get("appMeta.allowAnonymousAccess") ? "/" : "/auth/login";
		}
	}
});