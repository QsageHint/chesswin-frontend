import { Injectable } from '@angular/core';

// aws cognito
import * as AWS from 'aws-sdk/global';
import { AuthenticationDetails, CognitoUserAttribute, CognitoUserPool, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

// rxjs
import { BehaviorSubject, Observable } from 'rxjs';

// interfaces
import { User } from 'src/app/common/models/user';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
	user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

	private poolData = {
		UserPoolId: environment.cognito.poolId,
		ClientId: environment.cognito.webClientId
	};

	private userPool;

	constructor() {
		this.userPool = new CognitoUserPool(this.poolData);
	}

	async getCurrentUser() {
		const cognitoUser = this.userPool.getCurrentUser();

		return new Promise((resolve, reject) => {
			if (cognitoUser) {
				cognitoUser.getSession((error: any, session: CognitoUserSession) => {
					if (error) {
						this.user.next(null);

						reject(error);
					} else {
						if (session.isValid()) {
							const payload = session.getIdToken().payload;

							this.user.next(payload as User);

							resolve(payload);
						} else {
							cognitoUser.refreshSession(session.getRefreshToken(), (refreshSessionError: any, newSession: CognitoUserSession) => {
								if (refreshSessionError) {
									this.user.next(null);

									reject(refreshSessionError);
								} else {
									const payload = session.getIdToken().payload;

									this.user.next(payload as User);

									resolve(payload);
								}
							});
						}
					}
				});
			} else {
				this.user.next(null);

				resolve(null);
			}
		});
	}

	getAccessToken(): Promise<string> {
		const cognitoUser = this.userPool.getCurrentUser();

		return new Promise((resolve, reject) => {
			if (cognitoUser) {
				cognitoUser.getSession((error, session: CognitoUserSession) => {
					if (error) {
						reject(error);
					}

					const token = session.getAccessToken().getJwtToken();

					resolve(token);
				});
			}
		});
	}

	login(username: string, password: string) {
		const authenticationData = {
			Username: username,
			Password: password
		};

		const authenticationDetails = new AuthenticationDetails(authenticationData);

		const userData = {
			Username: username,
			Pool: this.userPool
		};

		const cognitoUser = new CognitoUser(userData);

		return new Promise((resolve, reject) => {
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: result => {
					AWS.config.region = environment.cognito.region;

					AWS.config.credentials = new AWS.CognitoIdentityCredentials({
						IdentityPoolId: environment.cognito.identityPoolId,
						Logins: {
							loginUrl: result.getIdToken().getJwtToken()
						}
					});

					const payload = result.getIdToken().payload;

					this.user.next(payload as User);

					resolve(payload);
				},

				onFailure: error => {
					reject(error);
				}
			});
		});
	}

	signup(username: string, password: string, email: string, firstName: string, lastName: string, country: string) {
		const attributeList = [];
	
		attributeList.push(new CognitoUserAttribute({ Name: 'email', Value: email }));
		attributeList.push(new CognitoUserAttribute({ Name: 'given_name', Value: firstName }));
		attributeList.push(new CognitoUserAttribute({ Name: 'family_name', Value: lastName }));
		attributeList.push(new CognitoUserAttribute({ Name: 'locale', Value: country }));
	
		return new Promise((resolve, reject) => {
			this.userPool.signUp(username, password, attributeList, null, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result.user);
				}
			});
		});
	}

	verify(cognitousername: string, code: string) {
		const userData = {
			Username: cognitousername,
			Pool: this.userPool
		};

		const cognitoUser = new CognitoUser(userData);

		return new Promise((resolve, reject) => {
			cognitoUser.confirmRegistration(code, true, (confirmError, confirmResult) => {
				if (confirmError) {
					reject(confirmError);
				} else {
					resolve(confirmResult);
				}
			});
		});
	}

	refreshToken(): Observable<string> {
		const cognitoUser = this.userPool.getCurrentUser();

		return new Observable(observer => {
			if (cognitoUser) {
				cognitoUser.getSession((error, session: CognitoUserSession) => {
					if (error) {
						observer.error(error);
					}

					cognitoUser.refreshSession(session.getRefreshToken(), (refreshSessionError: any) => {
						if (refreshSessionError) {
							observer.next('');
						} else {
							const refreshedToken = session.getAccessToken().getJwtToken();

							observer.next(refreshedToken);
						}
					});
				});
			} else {
				observer.next('');
			}
		});
	}

	signOut() {
		const username = this.user.getValue().email;

		const userData = {
			Username: username,
			Pool: this.userPool
		};

		const cognitoUser = new CognitoUser(userData);

		this.user.next(null);

		cognitoUser.signOut();
	}
}
