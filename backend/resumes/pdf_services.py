"""
Resume PDF Generation Service using ReportLab.
Generates clean, executive A4 PDF documents with dynamic content-driven spacing,
multi-page pagination, and custom accent color branding.
"""
import io
import re
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas


class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and print 'Page X of Y' in the footer.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#6B6B6B"))

        # Footer divider line
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(36, 28, A4[0] - 36, 28)

        # Footer text
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(A4[0] - 36, 16, footer_text)
        self.drawString(36, 16, "Generated via ResumeCraft ATS Engine")
        self.restoreState()


def _clean_text(val):
    if not val:
        return ""
    # Strip HTML tags
    clean = re.sub(r"<[^>]+>", "", str(val))
    return clean.strip()


def _parse_accent_color(hex_str, default="#FA0C40"):
    if not hex_str or not isinstance(hex_str, str):
        return colors.HexColor(default)
    hex_str = hex_str.strip()
    if not hex_str.startswith("#"):
        hex_str = "#" + hex_str
    try:
        return colors.HexColor(hex_str)
    except Exception:
        return colors.HexColor(default)


def generate_resume_pdf(resume_data):
    """
    Builds a PDF file from a dictionary or Resume instance.
    Returns bytes of the generated PDF document.
    """
    buffer = io.BytesIO()

    # Page Margins: 36pt (0.5 in) left/right, 40pt top, 40pt bottom
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=40,
    )

    # Normalize data fields
    accent_hex = resume_data.get("accentColor") or resume_data.get("accent_color") or "#FA0C40"
    accent_color = _parse_accent_color(accent_hex)
    dark_ink = colors.HexColor("#252525")
    slate_gray = colors.HexColor("#6B6B6B")

    personal = resume_data.get("personalDetails") or resume_data.get("personal_details") or {}
    first_name = personal.get("firstName") or personal.get("first_name") or ""
    last_name = personal.get("lastName") or personal.get("last_name") or ""
    full_name = f"{first_name} {last_name}".strip() or resume_data.get("title") or "YOUR NAME"

    job_title = personal.get("jobTitle") or personal.get("job_title") or resume_data.get("target_role") or "Professional"
    email = personal.get("email") or ""
    phone = personal.get("phone") or ""
    city = personal.get("city") or ""
    country = personal.get("country") or "India"
    location = ", ".join(filter(None, [city, country]))

    summary = resume_data.get("professional_summary") or resume_data.get("summary") or ""
    experiences = resume_data.get("experiences") or []
    education = resume_data.get("education") or []
    skills = resume_data.get("skills") or []
    social_links = resume_data.get("socialLinks") or resume_data.get("social_links") or []

    additional = resume_data.get("additionalSections") or resume_data.get("additional_sections") or {}
    projects = additional.get("projects") or resume_data.get("projects") or []
    languages = additional.get("languages") or resume_data.get("languages") or []
    hobbies = resume_data.get("hobbies") or ""

    # Setup typography styles
    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        "CandidateName",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=dark_ink,
        textTransform="uppercase",
    )

    title_style = ParagraphStyle(
        "CandidateTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        textColor=accent_color,
    )

    contact_style = ParagraphStyle(
        "ContactInfo",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=slate_gray,
        alignment=2, # Right aligned
    )

    section_header_style = ParagraphStyle(
        "SectionHeader",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=13,
        textColor=accent_color,
        textTransform="uppercase",
        spaceBefore=8,
        spaceAfter=3,
    )

    item_title_style = ParagraphStyle(
        "ItemTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.5,
        leading=12.5,
        textColor=dark_ink,
    )

    item_sub_style = ParagraphStyle(
        "ItemSub",
        parent=styles["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=8.5,
        leading=11.5,
        textColor=slate_gray,
    )

    item_date_style = ParagraphStyle(
        "ItemDate",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11.5,
        textColor=dark_ink,
        alignment=2, # Right aligned
    )

    body_style = ParagraphStyle(
        "BodyTextCustom",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=dark_ink,
    )

    bullet_style = ParagraphStyle(
        "BulletCustom",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=dark_ink,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2,
    )

    story = []

    # =========================================================================
    # 1. HEADER BLOCK: Name & Title on Left, Contact on Right
    # =========================================================================
    contact_lines = []
    if location:
        contact_lines.append(location)
    if email:
        contact_lines.append(email)
    if phone:
        contact_lines.append(phone)
    for link in social_links:
        url = link.get("url") if isinstance(link, dict) else str(link)
        if url:
            contact_lines.append(url.replace("https://", "").replace("http://", ""))

    contact_p = Paragraph("<br/>".join(contact_lines), contact_style) if contact_lines else Paragraph("", contact_style)

    header_left = [
        Paragraph(full_name, name_style),
        Spacer(1, 2),
        Paragraph(job_title, title_style),
    ]

    header_table = Table(
        [[header_left, contact_p]],
        colWidths=[A4[0] - 72 - 180, 180],
    )
    header_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))

    story.append(header_table)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.5, color=accent_color, spaceBefore=2, spaceAfter=8))

    # =========================================================================
    # 2. PROFESSIONAL SUMMARY
    # =========================================================================
    if summary and _clean_text(summary):
        story.append(Paragraph("Professional Summary", section_header_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=4))
        story.append(Paragraph(_clean_text(summary), body_style))
        story.append(Spacer(1, 6))

    # =========================================================================
    # 3. WORK EXPERIENCE
    # =========================================================================
    if experiences and len(experiences) > 0:
        story.append(Paragraph("Work Experience", section_header_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        for exp in experiences:
            role = exp.get("role") or exp.get("title") or "Software Engineer"
            company = exp.get("company") or ""
            city_exp = exp.get("city") or exp.get("location") or ""
            company_loc = " · ".join(filter(None, [company, city_exp]))

            # Format dates
            start_m = exp.get("startMonth") or exp.get("start_month") or ""
            start_y = exp.get("startYear") or exp.get("start_year") or ""
            end_m = exp.get("endMonth") or exp.get("end_month") or ""
            end_y = exp.get("endYear") or exp.get("end_year") or ""
            is_curr = exp.get("isCurrent") or exp.get("is_current") or False

            start_str = f"{start_m} {start_y}".strip()
            end_str = "Present" if is_curr else f"{end_m} {end_y}".strip()
            date_str = f"{start_str} — {end_str}".strip(" —")

            exp_header_table = Table(
                [[
                    Paragraph(f"<b>{role}</b>", item_title_style),
                    Paragraph(date_str, item_date_style)
                ]],
                colWidths=[A4[0] - 72 - 140, 140],
            )
            exp_header_table.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))

            exp_block = [exp_header_table]
            if company_loc:
                exp_block.append(Paragraph(company_loc, item_sub_style))
                exp_block.append(Spacer(1, 2))

            # Bullets
            raw_desc = exp.get("description") or ""
            bullet_points = exp.get("bullet_points") or []

            lines = []
            if bullet_points and isinstance(bullet_points, list):
                lines = bullet_points
            elif raw_desc:
                lines = [l.strip() for l in raw_desc.split("\n") if l.strip()]

            for line in lines:
                clean_line = line.lstrip("•-* ").strip()
                if clean_line:
                    exp_block.append(Paragraph(f"• {clean_line}", bullet_style))

            exp_block.append(Spacer(1, 5))
            story.append(KeepTogether(exp_block))

        story.append(Spacer(1, 3))

    # =========================================================================
    # 4. EDUCATION
    # =========================================================================
    if education and len(education) > 0:
        story.append(Paragraph("Education", section_header_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        for edu in education:
            degree = edu.get("degree") or "Bachelor of Technology"
            inst = edu.get("institution") or ""
            city_edu = edu.get("city") or ""
            inst_loc = " · ".join(filter(None, [inst, city_edu]))

            start_y = edu.get("startYear") or edu.get("start_year") or ""
            end_y = edu.get("endYear") or edu.get("end_year") or edu.get("year") or ""
            date_str = f"{start_y} — {end_y}".strip(" —") if (start_y or end_y) else ""

            marks_type = edu.get("marksType") or "CGPA"
            marks = edu.get("marks") or edu.get("grade") or ""
            marks_str = f"{marks_type}: {marks}" if marks else ""

            edu_header_table = Table(
                [[
                    Paragraph(f"<b>{degree}</b>", item_title_style),
                    Paragraph(date_str, item_date_style)
                ]],
                colWidths=[A4[0] - 72 - 120, 120],
            )
            edu_header_table.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))

            edu_block = [edu_header_table]
            sub_elements = [inst_loc, marks_str]
            full_sub = " · ".join(filter(None, sub_elements))
            if full_sub:
                edu_block.append(Paragraph(full_sub, item_sub_style))

            edu_desc = edu.get("description") or ""
            if edu_desc and _clean_text(edu_desc):
                edu_block.append(Spacer(1, 2))
                edu_block.append(Paragraph(_clean_text(edu_desc), body_style))

            edu_block.append(Spacer(1, 5))
            story.append(KeepTogether(edu_block))

        story.append(Spacer(1, 3))

    # =========================================================================
    # 5. CORE COMPETENCIES & SKILLS
    # =========================================================================
    if skills and len(skills) > 0:
        story.append(Paragraph("Core Competencies & Skills", section_header_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        skill_names = []
        for s in skills:
            if isinstance(s, dict):
                name = s.get("name") or ""
            else:
                name = str(s)
            if name:
                skill_names.append(name)

        if skill_names:
            skills_text = " · ".join(skill_names)
            story.append(Paragraph(skills_text, body_style))
            story.append(Spacer(1, 8))

    # =========================================================================
    # 6. PROJECTS
    # =========================================================================
    if projects and len(projects) > 0:
        story.append(Paragraph("Key Projects", section_header_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        for proj in projects:
            title = proj.get("title") or proj.get("name") or "Project"
            tech = proj.get("techStack") or proj.get("tech_stack") or ""
            link = proj.get("link") or ""

            proj_header_table = Table(
                [[
                    Paragraph(f"<b>{title}</b>", item_title_style),
                    Paragraph(link.replace("https://", "").replace("http://", ""), item_date_style) if link else Paragraph("", item_date_style)
                ]],
                colWidths=[A4[0] - 72 - 160, 160],
            )
            proj_header_table.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))

            proj_block = [proj_header_table]
            if tech:
                proj_block.append(Paragraph(f"Technologies: {tech}", item_sub_style))
                proj_block.append(Spacer(1, 2))

            desc = proj.get("description") or ""
            if desc:
                for line in desc.split("\n"):
                    clean = line.lstrip("•-* ").strip()
                    if clean:
                        proj_block.append(Paragraph(f"• {clean}", bullet_style))

            proj_block.append(Spacer(1, 5))
            story.append(KeepTogether(proj_block))

        story.append(Spacer(1, 3))

    # =========================================================================
    # 7. LANGUAGES & HOBBIES
    # =========================================================================
    additional_items = []
    if languages and len(languages) > 0:
        lang_strs = []
        for l in languages:
            if isinstance(l, dict):
                lname = l.get("name") or ""
                lprof = l.get("proficiency") or ""
                lang_strs.append(f"{lname} ({lprof})" if lprof else lname)
            else:
                lang_strs.append(str(l))
        if lang_strs:
            additional_items.append(f"<b>Languages:</b> {', '.join(lang_strs)}")

    if hobbies:
        additional_items.append(f"<b>Interests & Hobbies:</b> {_clean_text(hobbies)}")

    if additional_items:
        story.append(Paragraph("Additional Information", section_header_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))
        for item in additional_items:
            story.append(Paragraph(item, body_style))
            story.append(Spacer(1, 3))

    # Build PDF with multi-page NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes

