import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsAndConditionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.lastUpdated}>Effective Date: 16/10/2024</Text>
        <Text style={styles.lastUpdated}>Last Updated: 16/01/2025</Text>
        
        <Text style={styles.paragraph}>
          Welcome to Prasang, an event management platform designed to connect organizers and
          participants seamlessly. By accessing or using our app (referred to as the "Service"), you
          agree to these Terms of Service. Please read them carefully before proceeding. If you do not
          agree, you must refrain from using the Service.
        </Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By downloading, installing, or using Prasang, you agree to comply with and be bound by
          these Terms of Service. These terms form a legally binding agreement between you ("User")
          and  ("we," "us," or "our").
        </Text>
        <Text style={styles.paragraph}>
          If you are using the Service on behalf of an organization, you confirm that you are authorized
          to accept these terms on behalf of that organization.
        </Text>

        <Text style={styles.sectionTitle}>2. Eligibility</Text>
        <Text style={styles.bulletPoint}>• You must be at least 18 years old or have the consent of a legal guardian to use the Service.</Text>
        <Text style={styles.bulletPoint}>• Users under the age of 13 are strictly prohibited from using the Service in compliance with applicable laws.</Text>

        <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
        <Text style={styles.paragraph}>You agree to:</Text>
        <Text style={styles.bulletPoint}>1. Provide accurate, complete, and current information when creating an account or registering for events.</Text>
        <Text style={styles.bulletPoint}>2. Keep your login credentials confidential and notify us immediately of any unauthorized access to your account.</Text>
        <Text style={styles.bulletPoint}>3. Use the Service only for lawful purposes and refrain from:</Text>
        <Text style={styles.subBulletPoint}>• Impersonating another individual or entity.</Text>
        <Text style={styles.subBulletPoint}>• Uploading malicious content, including viruses or harmful code.</Text>
        <Text style={styles.subBulletPoint}>• Engaging in activities that violate the rights of others, including intellectual property or privacy rights.</Text>

        <Text style={styles.sectionTitle}>4. Event Organizer Responsibilities</Text>
        <Text style={styles.paragraph}>If you are an event organizer, you agree to:</Text>
        <Text style={styles.bulletPoint}>1. Provide accurate and honest event information, including descriptions, dates, and locations.</Text>
        <Text style={styles.bulletPoint}>2. Ensure compliance with all legal and regulatory requirements for your events.</Text>
        <Text style={styles.bulletPoint}>3. Manage participant data responsibly and in accordance with our Privacy Policy.</Text>

        <Text style={styles.sectionTitle}>5. License to Use</Text>
        <Text style={styles.paragraph}>
          We grant you a non-exclusive, non-transferable, revocable license to use the app for its
          intended purpose. This license does not include rights to:
        </Text>
        <Text style={styles.bulletPoint}>• Reverse-engineer, decompile, or attempt to extract source code.</Text>
        <Text style={styles.bulletPoint}>• Use the Service for unauthorized commercial purposes.</Text>
        <Text style={styles.bulletPoint}>• Copy, modify, or distribute any part of the Service without prior written consent.</Text>

        <Text style={styles.sectionTitle}>6. Payments and Refunds</Text>
        <Text style={styles.paragraph}>If your use of the Service involves paid features, you agree to the following:</Text>
        <Text style={styles.bulletPoint}>• Payment terms, including applicable fees, will be displayed before purchase.</Text>
        <Text style={styles.bulletPoint}>• Refunds will be provided at our sole discretion and subject to applicable refund policies.</Text>
        <Text style={styles.bulletPoint}>• We are not liable for disputes between event organizers and participants regarding ticket sales or refunds.</Text>

        <Text style={styles.sectionTitle}>7. Intellectual Property Rights</Text>
        <Text style={styles.bulletPoint}>• All content, design elements, and features of the Service, including but not limited to logos, text, graphics, and code, are the intellectual property of.</Text>
        <Text style={styles.bulletPoint}>• You are prohibited from copying, reproducing, or creating derivative works of any material provided through the Service.</Text>

        <Text style={styles.sectionTitle}>8. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Your use of the Service is governed by our Privacy Policy, which outlines how we collect,
          use, and protect your personal data. By agreeing to these Terms, you also agree to our Privacy
          Policy.
        </Text>

        <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
        <Text style={styles.paragraph}>To the fullest extent permitted by law:</Text>
        <Text style={styles.bulletPoint}>• We are not responsible for any indirect, incidental, or consequential damages arising from your use of the Service.</Text>
        <Text style={styles.bulletPoint}>• The Service is provided "as is" without warranties of any kind, express or implied.</Text>

        <Text style={styles.sectionTitle}>10. Termination</Text>
        <Text style={styles.paragraph}>We reserve the right to:</Text>
        <Text style={styles.bulletPoint}>1. Suspend or terminate your account if you violate these Terms.</Text>
        <Text style={styles.bulletPoint}>2. Discontinue or modify the Service at any time without prior notice.</Text>
        <Text style={styles.paragraph}>
          You may terminate your use of the Service at any time by deleting your account. Upon
          termination, all licenses granted to you will cease immediately.
        </Text>
{/* 
        <Text style={styles.sectionTitle}>11. Dispute Resolution</Text>
        <Text style={styles.bulletPoint}>• Governing Law: These Terms shall be governed by and construed in accordance with the laws of .</Text>
        <Text style={styles.bulletPoint}>• Arbitration: Any disputes arising under these Terms will be resolved through binding arbitration in .</Text> */}

        <Text style={styles.sectionTitle}>11. Modifications to Terms</Text>
        <Text style={styles.paragraph}>
          We may update these Terms from time to time. Changes will be posted within the app, and
          significant updates will be communicated to users. Your continued use of the Service after
          such updates constitutes acceptance of the revised Terms.
        </Text>

        <Text style={styles.sectionTitle}>12. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions about these Terms or the Service, please contact us at:
        </Text>
        <Text style={styles.bulletPoint}>• Email: Keshav.sinha@yandex.com</Text>

        <Text style={styles.sectionTitle}>13. Miscellaneous</Text>
        <Text style={styles.bulletPoint}>• These Terms constitute the entire agreement between you and regarding the use of the Service.</Text>
        <Text style={styles.bulletPoint}>• If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in effect.</Text>

        <Text style={styles.paragraph}>
          This Terms of Service ensures transparency and sets clear expectations for both users and
          organizers.
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
  paragraph: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 24,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
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

