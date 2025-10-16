import { Document, Page, View, Text, StyleSheet, Image, Link } from '@react-pdf/renderer';
import type { CVData } from './types/cv';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    padding: 36,
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  profileImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    objectFit: 'cover',
    marginRight: 16,
  },
  headerContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 6,
  },
  title: {
    fontSize: 11,
    color: '#4b5563',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    color: '#1d4ed8',
    textDecoration: 'none',
    fontSize: 9,
    marginRight: 12,
    marginBottom: 4,
  },
  contactLocation: {
    fontSize: 9,
    color: '#4b5563',
    marginRight: 12,
    marginBottom: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    color: '#1f2937',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 10,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 10,
  },
  position: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 2,
  },
  companyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
    color: '#4b5563',
    fontSize: 9,
  },
  companyText: {
    marginRight: 6,
  },
  companyDot: {
    marginRight: 6,
  },
  bulletList: {
    flexDirection: 'column',
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletSymbol: {
    fontSize: 10,
    lineHeight: 1.4,
    marginRight: 4,
  },
  bulletContent: {
    flex: 1,
    fontSize: 10,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 8,
  },
  educationSchool: {
    fontSize: 11,
    fontWeight: 600,
  },
  muted: {
    color: '#6b7280',
    fontSize: 9,
  },
  skillsRow: {
    flexDirection: 'column',
    marginTop: 4,
  },
  skillCategory: {
    fontSize: 10,
    color: '#111827',
    marginBottom: 4,
  },
  languagesRow: {
    flexDirection: 'column',
    marginTop: 4,
  },
  languageItem: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 3,
  },
  volunteerItem: {
    marginBottom: 10,
  },
});

interface CVPDFDocumentProps {
  data: CVData;
}

export function CVPDFDocument({ data }: CVPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={data.profile.profileImage} style={styles.profileImage} />
          <View style={styles.headerContent}>
            <Text style={styles.name}>{data.profile.name}</Text>
            <Text style={styles.title}>{data.profile.title}</Text>
            <View style={styles.contactRow}>
              <Link src={`mailto:${data.profile.email}`} style={styles.contactItem}>
                {data.profile.email}
              </Link>
              <Link src={`tel:${data.profile.phone}`} style={styles.contactItem}>
                {data.profile.phone}
              </Link>
              <Text style={styles.contactLocation}>{data.profile.location}</Text>
              {data.profile.linkedin && (
                <Link src={data.profile.linkedin} style={styles.contactItem}>
                  LinkedIn
                </Link>
              )}
              {data.profile.github && (
                <Link src={data.profile.github} style={styles.contactItem}>
                  GitHub
                </Link>
              )}
              {data.profile.website && (
                <Link src={data.profile.website} style={styles.contactItem}>
                  Portfolio
                </Link>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.paragraph}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem} wrap={false}>
              <Text style={styles.position}>{exp.position}</Text>
              <View style={styles.companyRow}>
                <Text style={styles.companyText}>{exp.company}</Text>
                <Text style={styles.companyDot}>•</Text>
                <Text style={styles.companyText}>{exp.period}</Text>
              </View>
              <View style={styles.bulletList}>
                {exp.description.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.bulletItem}>
                    <Text style={styles.bulletSymbol}>•</Text>
                    <Text style={styles.bulletContent}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem} wrap={false}>
              <Text style={styles.educationSchool}>{edu.school}</Text>
              <Text style={styles.muted}>
                {edu.degree}
                {edu.field ? ` • ${edu.field}` : ''}
              </Text>
              {edu.details && <Text style={styles.paragraph}>{edu.details}</Text>}
              <Text style={styles.muted}>{edu.period}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          <View style={styles.skillsRow}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skillCategory}>
                {skill.category}: {skill.skills.join(', ')}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.languagesRow}>
            {data.languages.map((language, index) => (
              <Text key={index} style={styles.languageItem}>
                {language.language} – {language.proficiency}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Volunteer Work</Text>
          {data.volunteer.map((volunteer, index) => (
            <View key={index} style={styles.volunteerItem} wrap={false}>
              <Text style={styles.position}>{volunteer.role}</Text>
              <View style={styles.companyRow}>
                <Text style={styles.companyText}>{volunteer.organization}</Text>
                <Text style={styles.companyDot}>•</Text>
                <Text style={styles.companyText}>{volunteer.period}</Text>
              </View>
              <View style={styles.bulletList}>
                {volunteer.description.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.bulletItem}>
                    <Text style={styles.bulletSymbol}>•</Text>
                    <Text style={styles.bulletContent}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
