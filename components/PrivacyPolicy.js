import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Effective Date: 16/10/2024</Text>
        <Text style={styles.lastUpdated}>Last Updated: 16/01/2025</Text>
        
        <Text style={styles.paragraph}>
          Prasang (referred to as "we," "us," or "our") is committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, share, and safeguard your personal information
          when you use our event management application (the "App"). By accessing or using the App,
          you agree to the terms outlined in this Privacy Policy.
        </Text>
        <Text style={styles.paragraph}>
          If you do not agree with these terms, please do not use our App.
        </Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information to provide, improve, and personalize our services. The types of data
          collected include:
        </Text>
        <Text style={styles.subSectionTitle}>a. Information You Provide to Us</Text>
        <Text style={styles.paragraph}>
          When you interact with our App, you may voluntarily provide us with:
        </Text>
        <Text style={styles.bulletPoint}>• Account Information: Name, email address, phone number, profile picture (optional), and password.</Text>
        <Text style={styles.bulletPoint}>• Event Registration Details: Designation, organization name, and other custom fields created by event organizers.</Text>
        <Text style={styles.bulletPoint}>• Payment Information (if applicable): Billing address, payment method details, and transaction history (processed securely through third-party payment processors).</Text>
        <Text style={styles.bulletPoint}>• Communication Data: Feedback, queries, or customer support messages.</Text>

        <Text style={styles.subSectionTitle}>b. Information Collected Automatically</Text>
        <Text style={styles.paragraph}>
          When you use the App, we automatically collect:
        </Text>
        <Text style={styles.bulletPoint}>• Device Information: Device type, operating system, unique device identifiers, and IP address.</Text>
        <Text style={styles.bulletPoint}>• Usage Information: Details such as pages visited, time spent on features, and app interaction metrics.</Text>
        <Text style={styles.bulletPoint}>• Location Data: Approximate location based on your IP address or device settings (if permitted).</Text>

        <Text style={styles.subSectionTitle}>c. Information From Third-Party Services</Text>
        <Text style={styles.paragraph}>
          If you connect your account to third-party platforms (e.g., social media, Google, Apple), we may collect:
        </Text>
        <Text style={styles.bulletPoint}>• Profile information, such as name, email, and profile picture.</Text>
        <Text style={styles.bulletPoint}>• Permissions granted through those platforms (e.g., access to contacts or calendar events).</Text>

        <Text style={styles.subSectionTitle}>d. Special Categories of Data</Text>
        <Text style={styles.paragraph}>
          We do not intentionally collect sensitive data (e.g., health information, race, religion) unless
          required for specific event purposes and explicitly authorized by the user.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the collected data for purposes including, but not limited to:
        </Text>
        <Text style={styles.bulletPoint}>1. Service Delivery:</Text>
        <Text style={styles.subBulletPoint}>• Facilitate account creation, event management, and participant registration.</Text>
        <Text style={styles.subBulletPoint}>• Generate and deliver e-cards for event access.</Text>
        <Text style={styles.bulletPoint}>2. Personalization:</Text>
        <Text style={styles.subBulletPoint}>• Customize the app experience based on user preferences and activities.</Text>
        <Text style={styles.subBulletPoint}>• Recommend relevant events or features.</Text>
        <Text style={styles.bulletPoint}>3. Communication:</Text>
        <Text style={styles.subBulletPoint}>• Send notifications about event updates, reminders, and announcements.</Text>
        <Text style={styles.subBulletPoint}>• Respond to inquiries, feedback, or technical support requests.</Text>
        <Text style={styles.bulletPoint}>4. Analytics and Improvement:</Text>
        <Text style={styles.subBulletPoint}>• Analyze usage trends and performance to enhance functionality and user experience.</Text>
        <Text style={styles.subBulletPoint}>• Conduct research and develop new features.</Text>
        <Text style={styles.bulletPoint}>5. Legal and Compliance:</Text>
        <Text style={styles.subBulletPoint}>• Comply with legal obligations, resolve disputes, and enforce terms of service.</Text>
        <Text style={styles.subBulletPoint}>• Detect and prevent fraudulent activities.</Text>

        <Text style={styles.sectionTitle}>3. Sharing Your Information</Text>
        <Text style={styles.paragraph}>
          We do not sell your personal information. However, your data may be shared as follows:
        </Text>
        <Text style={styles.subSectionTitle}>a. With Event Organizers</Text>
        <Text style={styles.paragraph}>
          When you register for an event, organizers may access the details you provide to
          manage the event efficiently.
        </Text>
        <Text style={styles.subSectionTitle}>b. With Service Providers</Text>
        <Text style={styles.paragraph}>
          We work with trusted partners for:
        </Text>
        <Text style={styles.bulletPoint}>• Payment processing.</Text>
        <Text style={styles.bulletPoint}>• Cloud hosting and data storage.</Text>
        <Text style={styles.bulletPoint}>• Email and notification delivery.</Text>
        <Text style={styles.bulletPoint}>• Analytics and performance monitoring.</Text>
        <Text style={styles.subSectionTitle}>c. Legal and Regulatory Authorities</Text>
        <Text style={styles.paragraph}>
          Information may be disclosed to comply with legal obligations or enforce our rights,
          such as:
        </Text>
        <Text style={styles.bulletPoint}>• Responding to subpoenas, court orders, or law enforcement requests.</Text>
        <Text style={styles.bulletPoint}>• Preventing fraud, abuse, or harm to our users or systems.</Text>
        <Text style={styles.subSectionTitle}>d. Business Transfers</Text>
        <Text style={styles.paragraph}>
          If we merge with, are acquired by, or sell assets to another company, your data may be
          transferred as part of the transaction.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          We prioritize the protection of your data and implement industry-standard security practices,
          such as:
        </Text>
        <Text style={styles.bulletPoint}>• Data Encryption: Protecting information during transmission and storage using SSL/TLS protocols.</Text>
        <Text style={styles.bulletPoint}>• Access Control: Ensuring only authorized personnel can access sensitive data.</Text>
        <Text style={styles.bulletPoint}>• Monitoring: Conducting regular audits and implementing intrusion detection systems.</Text>
        <Text style={styles.paragraph}>
          While we strive to safeguard your information, no system can guarantee absolute security.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights and Choices</Text>
        <Text style={styles.paragraph}>
          Depending on your location, you may have the following rights regarding your data:
        </Text>
        <Text style={styles.bulletPoint}>1. Access: Request access to the personal data we hold about you.</Text>
        <Text style={styles.bulletPoint}>2. Correction: Update or correct your information to ensure accuracy.</Text>
        <Text style={styles.bulletPoint}>3. Deletion: Request the deletion of your account and data.</Text>
        <Text style={styles.bulletPoint}>4. Portability: Obtain a copy of your data in a structured, machine-readable format.</Text>
        <Text style={styles.bulletPoint}>5. Opt-Out: Withdraw consent for specific data processing activities, such as marketing communications.</Text>
        <Text style={styles.paragraph}>
          To exercise these rights, please contact us at [Support Email].
        </Text>

        <Text style={styles.sectionTitle}>6. Data Retention</Text>
        <Text style={styles.paragraph}>
          We retain your personal information only as long as necessary to fulfill the purposes outlined
          in this Privacy Policy, comply with legal obligations, or resolve disputes. When no longer
          required, data will be securely deleted or anonymized.
        </Text>

        <Text style={styles.sectionTitle}>7. Cookies and Tracking Technologies</Text>
        <Text style={styles.paragraph}>
          We use cookies, web beacons, and similar technologies to enhance your experience and
          analyze usage. Types of cookies include:
        </Text>
        <Text style={styles.bulletPoint}>• Essential Cookies: Necessary for the app's core functionality.</Text>
        <Text style={styles.bulletPoint}>• Performance Cookies: Collect anonymous usage data to improve features.</Text>
        <Text style={styles.bulletPoint}>• Preference Cookies: Save your preferences for future sessions.</Text>
        <Text style={styles.paragraph}>
          You can control cookie settings through your browser or device preferences.
        </Text>

        <Text style={styles.sectionTitle}>8. International Data Transfers</Text>
        <Text style={styles.paragraph}>
          If you access our App from outside [Insert Country/Region], your information may be
          transferred to and processed in a country with different data protection laws. We ensure
          appropriate safeguards are in place, such as standard contractual clauses or compliance with
          legal frameworks like GDPR.
        </Text>

        <Text style={styles.sectionTitle}>9. Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Our App is not intended for users under 13 years of age (or the minimum age in your
          jurisdiction). If we become aware of unauthorized data collection from children, we will
          promptly delete such information.
        </Text>

        <Text style={styles.sectionTitle}>10. Changes to This Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We reserve the right to update this Privacy Policy at any time. Changes will be posted on this
          page, and significant updates will be communicated via email or in-app notifications. Please
          review this policy periodically.
        </Text>

        <Text style={styles.sectionTitle}>11. Contact Us</Text>
        <Text style={styles.paragraph}>
          For questions or concerns about this Privacy Policy or data handling practices, please contact
          us at:
        </Text>
        <Text style={styles.bulletPoint}>• Email: Keshav.sinha@yandex.com</Text>
        <Text style={styles.bulletPoint}>• Phone: +91 7004027470</Text>

        <Text style={styles.paragraph}>
          This detailed policy ensures compliance with global standards and provides transparency to
          users.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#444',
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 24,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    marginLeft: 15,
    lineHeight: 24,
  },
  subBulletPoint: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    marginLeft: 30,
    lineHeight: 24,
  },
});

