exports.itemTypes = [
  {
    srt1ID: "31",
    itemPrefix: "DRV",
    title: "Design Review",
    workflow: "Generic",
    singleton: false,
    dataValue: "design_review",
    module: "Design History File",
    headerCategory: "category-project-management",
    category: "category-design-review",
    user: "pm_user",
    owner: "tech_lead_user",
    approver: "qa_lead_user",
    sort: 1,
  },
  {
    srt1ID: "170",
    itemPrefix: "D-UND",
    title: "User Needs Document",
    workflow: "Generic",
    singleton: false,
    dataValue: "user_needs_document",
    module: "Design History File",
    headerCategory: "category-design-inputs",
    category: "category-user-needs-doc",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 2,
  },
  {
    srt1ID: "172",
    itemPrefix: "D-REQ",
    title: "Requirements Documents",
    workflow: "Generic",
    singleton: false,
    dataValue: "requirements_document",
    module: "Design History File",
    headerCategory: "category-design-inputs",
    category: "category-requirements-doc",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 3,
  },
  {
    srt1ID: "292",
    itemPrefix: "STD",
    title: "Standard Documents",
    workflow: "Generic",
    singleton: false,
    dataValue: "standard_document",
    module: "Design History File",
    headerCategory: "category-design-inputs",
    category: "category-standard-documents",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 4,
  },
  {
    srt1ID: "10",
    itemPrefix: "ARC",
    title: "System Architecture",
    workflow: "Generic",
    singleton: false,
    dataValue: "system_architecture",
    module: "Design History File",
    headerCategory: "category-design-criteria",
    category: "category-system-architecture",
    user: "biz_lead_user",
    owner: "lead_eng_user",
    approver: "qa_lead_user",
    sort: 5,
  },
  {
    srt1ID: "210",
    itemPrefix: "D-RAD",
    title: "Risk Assessment Document",
    workflow: "Generic",
    singleton: false,
    dataValue: "risk_assessment_document",
    module: "Design History File",
    category: "category-risk-assessment-docs",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 6,
  },
  {
    srt1ID: "174",
    itemPrefix: "D-TM",
    title: "Design Trace Matrix Documents",
    workflow: "Generic",
    singleton: false,
    dataValue: "design_trace_matrix",
    module: "Design History File",
    category: "category-design-trace-matrix-docs",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 7,
  },
  {
    srt1ID: "141",
    itemPrefix: "RKN",
    title: "Risk Notes",
    workflow: "Generic",
    singleton: false,
    dataValue: "risk_note",
    module: "Design History File",
    headerCategory: "category-risk-management",
    category: "category-risk-notes",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 8,
  },
  {
    srt1ID: "274",
    itemPrefix: "MIT",
    title: "Mitigations",
    workflow: "Generic",
    singleton: false,
    dataValue: "mitigation",
    module: "Design History File",
    headerCategory: "category-risk-management",
    category: "category-mitigations",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 9,
  },
  {
    srt1ID: "442",
    itemPrefix: "DUD",
    title: "Device Usage Description",
    workflow: "Generic",
    singleton: false,
    dataValue: "device_usage_description",
    module: "Design History File",
    headerCategory: "category-human-factors",
    category: "category-device-usage-description",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 10,
  },
  {
    srt1ID: "443",
    itemPrefix: "IFU",
    title: "Instructions for Use",
    workflow: "Generic",
    singleton: false,
    dataValue: "instructions_for_use",
    module: "Design History File",
    headerCategory: "category-human-factor",
    category: "category-instructions-for-use",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 11,
  },
  {
    srt1ID: "245",
    itemPrefix: "DO",
    title: "Design Output",
    workflow: "Generic",
    singleton: false,
    dataValue: "design_output",
    module: "Design History File",
    category: "category-design-output",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 12,
  },
  {
    srt1ID: "300",
    itemPrefix: "TPN",
    title: "Test Protocol Notes",
    workflow: "Generic",
    singleton: false,
    dataValue: "test_protocol_note",
    module: "Design History File",
    headerCategory: "category-testing",
    category: "category-test-protocol-notes",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 13,
  },
  {
    srt1ID: "19",
    itemPrefix: "VVP",
    title: "V & V Plan",
    workflow: "Generic",
    singleton: false,
    dataValue: "verification_and_validation_plan",
    module: "Design History File",
    headerCategory: "category-testing",
    category: "category-v-v-plan",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 14,
  },
  {
    srt1ID: "15",
    itemPrefix: "D-VVPRO",
    title: "Design V&V Protocols",
    workflow: "Generic",
    singleton: false,
    dataValue: "dvv_protocol",
    module: "Design History File",
    headerCategory: "category-testing",
    category: "category-dvv-protocols",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 15,
  },
  {
    srt1ID: "436",
    itemPrefix: "VAL",
    title: "Design Validation Protocol",
    workflow: "Generic",
    singleton: false,
    dataValue: "device_validation",
    module: "Design History File",
    headerCategory: "category-testing",
    category: "category-design-validation-protocol",
    user: "biz_lead_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 16,
  },
  {
    srt1ID: "273",
    itemPrefix: "MSD",
    title: "Misc. Documents",
    workflow: "Generic",
    singleton: false,
    dataValue: "miscellaneous_document",
    module: "Design History File",
    category: "category-misc-documents",
    user: "biz_lead_user",
    owner: "pm_user",
    approver: "qa_lead_user",
    sort: 17,
  },
  {
    srt1ID: "434",
    itemPrefix: "POL",
    title: "Policy",
    workflow: "Generic",
    singleton: false,
    dataValue: "policy",
    module: "Quality Management System",
    category: "category-policy",
    user: "pm_user",
    owner: "reg_aff_lead_user",
    approver: "qa_lead_user",
    sort: 18,
  },
  {
    srt1ID: "156",
    itemPrefix: "CQP",
    title: "Corporate Quality Plans",
    workflow: "Generic",
    singleton: false,
    dataValue: "corporate_quality_plan",
    module: "Quality Management System",
    category: "category-corporate-quality-plans",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 19,
  },
  {
    srt1ID: "169",
    itemPrefix: "QPL",
    title: "Quality Plans",
    workflow: "Generic",
    singleton: false,
    dataValue: "quality_plan",
    module: "Quality Management System",
    category: "category-quality-plans",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 20,
  },
  {
    srt1ID: "1",
    itemPrefix: "SOP",
    title: "Standard Operating Procedure",
    workflow: "Generic",
    singleton: false,
    dataValue: "standard_operating_procedure",
    module: "Quality Management System",
    category: "category-standard-operating-procedures",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 21,
  },
  {
    srt1ID: "125",
    itemPrefix: "FRM",
    title: "Form",
    workflow: "Generic",
    singleton: false,
    dataValue: "form",
    module: "Quality Management System",
    category: "category-forms",
    user: "biz_lead_user",
    owner: "pm_user",
    approver: "qa_lead_user",
    sort: 22,
  },
  {
    srt1ID: "129",
    itemPrefix: "WI",
    title: "Work Instructions",
    workflow: "Generic",
    singleton: false,
    dataValue: "work_instruction",
    module: "Quality Management System",
    category: "category-work-instructions",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 23,
  },
  {
    srt1ID: "128",
    itemPrefix: "TMP",
    title: "Templates",
    workflow: "Generic",
    singleton: false,
    dataValue: "template",
    module: "Quality Management System",
    category: "category-templates",
    user: "biz_lead_user",
    owner: "pm_user",
    approver: "qa_lead_user",
    sort: 24,
  },
  {
    srt1ID: "347",
    itemPrefix: "IQI",
    title: "Incoming Quality Inspections",
    workflow: "Generic",
    singleton: false,
    dataValue: "incoming_quality_inspection",
    module: "Quality Management System",
    headerCategory: "category-acceptance-specifications",
    category: "category-incoming-quality-inspections",
    user: "biz_lead_user",
    owner: "pm_user",
    approver: "qa_lead_user",
    sort: 25,
  },
  {
    srt1ID: "348",
    itemPrefix: "IPI",
    title: "In Process Inspections",
    workflow: "Generic",
    singleton: false,
    dataValue: "in_process_inspection",
    module: "Quality Management System",
    headerCategory: "category-acceptance-specifications",
    category: "category-in-process-inspections",
    user: "biz_lead_user",
    owner: "pm_user",
    approver: "qa_lead_user",
    sort: 26,
  },
  {
    srt1ID: "346",
    itemPrefix: "FDI",
    title: "Final Device Inspections",
    workflow: "Generic",
    singleton: false,
    dataValue: "final_device_inspection",
    module: "Quality Management System",
    headerCategory: "category-acceptance-specifications",
    category: "category-final-device-inspections",
    user: "biz_lead_user",
    owner: "pm_user",
    approver: "qa_lead_user",
    sort: 27,
  },
  {
    srt1ID: "221",
    itemPrefix: "D-CAPA",
    title: "CAPAs",
    workflow: "Generic",
    singleton: false,
    dataValue: "capa_document",
    module: "Quality Management System",
    category: "category-capas",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 28,
  },
  {
    srt1ID: "237",
    itemPrefix: "V-URS",
    title: "Validation URS Docs",
    workflow: "Generic",
    singleton: false,
    dataValue: "validation_urs_document",
    module: "Validation Library",
    headerCategory: "category-validation-materials",
    category: "category-val-urs-doc",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 29,
  },
  {
    srt1ID: "241",
    itemPrefix: "V-REQ",
    title: "Validation Requirements Docs",
    workflow: "Generic",
    singleton: false,
    dataValue: "validation_requirements_document",
    module: "Validation Library",
    headerCategory: "category-validation-materials",
    category: "category-val-req-doc",
    user: "pm_user",
    owner: "biz_lead_user",
    approver: "qa_lead_user",
    sort: 30,
  },
]