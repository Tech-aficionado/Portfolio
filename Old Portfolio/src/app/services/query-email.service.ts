import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Service for sending transactional emails using the Brevo API.
 */
@Injectable({
  providedIn: 'root',
})
export class QueryEmailService {
  private apiKey: string = ''; // Store API key
  private brevo: any;
  private isBrevoLoaded = false;

  constructor() {
    // Load Brevo SDK during service initialization
    this.loadBrevoSDK().catch((error) =>
      console.error('Failed to load Brevo SDK:', error)
    );
  }

  /**
   * Dynamically loads the Brevo SDK in the browser.
   * @private
   */
  private async loadBrevoSDK(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('Brevo SDK can only be loaded in a browser environment');
    }

   

  /**
   * Sends a transactional email using the Brevo API.
   * @param toEmail The recipient's email address.
   * @param subject The subject of the email.
   * @param content The HTML content of the email.
   * @param senderName The name of the sender (default: 'Shivansh Goel').
   * @param senderEmail The sender's email address (default: 'no-reply@yourdomain.com').
   * @returns An Observable that resolves to the Brevo API response or throws an error.
   */
 
}

}