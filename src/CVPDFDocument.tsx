import { Document, Page, View, Text, StyleSheet, Image, Link } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { CVData } from './types/cv';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 36,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.55,
    color: '#1f2937',
  },
  header: {
    position: 'relative',
    marginBottom: 32,
    paddingBottom: 28,
  },
  headerAccent: {
    position: 'absolute',
    top: -36,
    left: -36,
    right: -36,
    height: 140,
    backgroundColor: '#eef2ff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileImageWrapper: {
    marginRight: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    objectFit: 'cover',
    borderWidth: 4,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  headerText: {
    flex: 1,
    paddingTop: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    color: '#1d4ed8',
    textDecoration: 'none',
    fontSize: 10,
    marginRight: 16,
    marginBottom: 8,
  },
  contactLocation: {
    fontSize: 10,
    color: '#4b5563',
    marginRight: 16,
    marginBottom: 8,
    textDecoration: 'none',
  },
  section: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  firstSection: {
    borderTopWidth: 0,
    paddingTop: 0,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#111827',
    marginBottom: 12,
  },
  paragraph: {
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 16,
  },
  position: {
    fontSize: 12,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    color: '#4b5563',
    fontSize: 10,
  },
  metaText: {
    marginRight: 6,
  },
  metaDot: {
    marginLeft: 6,
    marginRight: 6,
    color: '#d1d5db',
  },
  bulletList: {
    flexDirection: 'column',
    marginTop: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletSymbol: {
    fontSize: 12,
    lineHeight: 1.3,
    marginRight: 6,
    color: '#2563eb',
  },
  bulletContent: {
    flex: 1,
    fontSize: 11,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 16,
  },
  educationDegree: {
    fontSize: 12,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 2,
  },
  educationSchoolRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 4,
  },
  educationDetails: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 4,
  },
  skillsGroup: {
    marginBottom: 10,
  },
  skillCategory: {
    fontSize: 11,
    color: '#111827',
    marginBottom: 4,
  },
  languagesList: {
    flexDirection: 'column',
  },
  languageItem: {
    marginBottom: 12,
  },
  languageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  languageName: {
    fontSize: 11,
    color: '#111827',
  },
  languageLevel: {
    fontSize: 10,
    color: '#4b5563',
  },
  languageBars: {
    flexDirection: 'row',
  },
  languageBar: {
    flexGrow: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
    backgroundColor: '#e5e7eb',
  },
  languageBarActive: {
    backgroundColor: '#2563eb',
  },
  languageBarLast: {
    marginRight: 0,
  },
  volunteerItem: {
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 11,
    color: '#374151',
  },
});

interface CVPDFDocumentProps {
  data: CVData;
}

export function CVPDFDocument({ data }: CVPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerAccent} />
            <View style={styles.headerContent}>
              <View style={styles.profileImageWrapper}>
                <Image src={data.profile.profileImage} style={styles.profileImage} />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.name}>{data.profile.name}</Text>
                <Text style={styles.title}>{data.profile.title}</Text>
                <View style={styles.contactRow}>
                  <Link src={`mailto:${data.profile.email}`} style={styles.contactItem}>
                    {data.profile.email}
                  </Link>
                  <Link src={`tel:${data.profile.phone}`} style={styles.contactItem}>
                    {data.profile.phone}
                  </Link>
                  <Link
                    src={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.profile.location)}`}
                    style={styles.contactLocation}
                  >
                    {data.profile.location}
                  </Link>
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
          </View>

          <View style={[styles.section, styles.firstSection]} wrap={false}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem} wrap={false}>
                <Text style={styles.position}>{exp.position}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>{exp.company}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>{exp.period}</Text>
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
                <Text style={styles.educationDegree}>
                  {edu.field ? `${edu.degree} in ${edu.field}` : edu.degree}
                </Text>
                <View style={styles.educationSchoolRow}>
                  <Text style={styles.metaText}>{edu.school}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>{edu.period}</Text>
                </View>
                {edu.details && <Text style={styles.educationDetails}>{edu.details}</Text>}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Expertise</Text>
            {data.skills.map((skill, index) => (
              <View key={index} style={styles.skillsGroup} wrap={false}>
                <Text style={styles.skillCategory}>
                  {skill.category}: {skill.skills.join(', ')}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.languagesList}>
              {data.languages.map((language, index) => (
                <View key={index} style={styles.languageItem} wrap={false}>
                  <View style={styles.languageHeader}>
                    <Text style={styles.languageName}>{language.language}</Text>
                    <Text style={styles.languageLevel}>{language.proficiency}</Text>
                  </View>
                  <View style={styles.languageBars}>
                    {Array.from({ length: 5 }).map((_, levelIndex) => {
                      const barStyles: Style[] = [styles.languageBar];

                      if (levelIndex < language.level) {
                        barStyles.push(styles.languageBarActive);
                      }

                      if (levelIndex === 4) {
                        barStyles.push(styles.languageBarLast);
                      }

                      return (
                        <View
                          key={`${language.language}-level-${levelIndex}`}
                          style={barStyles}
                        />
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Work</Text>
            {data.volunteer.map((volunteer, index) => (
              <View key={index} style={styles.volunteerItem} wrap={false}>
                <Text style={styles.position}>{volunteer.role}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>{volunteer.organization}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>{volunteer.period}</Text>
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
        </View>
      </Page>
    </Document>
  );
}
