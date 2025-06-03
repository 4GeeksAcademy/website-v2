# Step-by-Step Guide: Implementing FAQs for Courses

This guide explains how to properly implement and display FAQs for courses in the 4Geeks Academy website codebase, using the existing FAQ system.

---

## 1. **Understand the FAQ Data Structure**
- All FAQs are centrally managed in YAML files:
  - English: `src/data/components/faq/faq.us.yml`
  - Spanish: `src/data/components/faq/faq.es.yml`
- Each FAQ entry is organized by topic and contains a list of questions and answers.
- Each question can be filtered by `locations`, `templates`, and `priority`.

**Example Structure:**
```yaml
faq:
  - topic: "Frequently Asked Questions about 4Geeks"
    slug: "4geeks"
    questions:
      - question: "Why 4Geeks Academy?"
        templates: ["faq"]
        priority: 0
        answer: "..."
```

---

## 2. **Do NOT Add FAQs Directly to Course YAML Files**
- The `faq` field in course YAML files (e.g., `src/data/course/full-stack.us.yaml`) is **not** recognized by the GraphQL schema and will not be available in page queries.
- Instead, all course-related FAQs must be added to the main FAQ YAML files as described above.

---

## 3. **Add Course-Specific FAQs to the Main FAQ YAML**
- Open the appropriate FAQ YAML file for the language.
- Add a new topic or append to an existing topic.
- For each course-specific question, add a `templates` field with a value matching the course template slug (e.g., `course-fullstack`, `course-datascience`, etc.).

**Example:**
```yaml
faq:
  - topic: "About the Part-Time Full Stack Developer Program"
    slug: "course-fullstack"
    questions:
      - question: "What is a Part-Time Full Stack Developer Program?"
        answer: "A Part-Time Full Stack Developer Program ..."
        priority: 1
        templates: ["course-fullstack"]
      - question: "How long is the Part-Time Full Stack Developer Program?"
        answer: "The Part-Time Full Stack Developer Program ..."
        priority: 1
        templates: ["course-fullstack"]
```

---

## 4. **Display FAQs in Course Templates**
- In the course template (e.g., `src/templates/course-fullstack.js`), use the `FaqCard` component.
- Pass the FAQ data from `allFaqYaml` and filter by the course template slug using the `topicSlug` or `template` prop.

**Example Usage:**
```jsx
<FaqCard
  faqs={data.allFaqYaml.edges[0].node.faq}
  topicSlug="course-fullstack"
/>
```

---

## 5. **How Filtering Works**
- The `FaqCard` component will only display questions that match the provided `topicSlug`, `locationSlug`, and/or `template`.
- You can further filter by location or priority as needed.

---

## 6. **Summary of Best Practices**
- **Centralize** all FAQs in the main FAQ YAML files.
- **Tag** course-specific questions with the correct `templates` value.
- **Do not** add a `faq` field directly to course YAML files.
- **Use** the `FaqCard` component in course templates, filtering by the appropriate slug.

---

## 7. **Troubleshooting**
- If FAQs are not showing up, ensure:
  - The question is in the main FAQ YAML file.
  - The `templates` field matches the course template slug.
  - The course template is passing the correct props to `FaqCard`.
  - The GraphQL query includes `allFaqYaml`.

---

**This approach ensures all FAQs are managed in one place and are easily filterable and maintainable across the site.** 