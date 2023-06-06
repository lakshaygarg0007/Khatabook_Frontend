SET SERVEROUTPUT ON;
DECLARE
    email_body clob;
    email_subject VARCHAR2(2000);

BEGIN

FOR PARTNER_LOOP IN (

SELECT DISTINCT
    hp.party_name,
    hca.account_number,
    okhtl.cognomen         "Agreement Name",
    okh.major_version,
    to_char(okh.start_date,'DD-MON-YYYY') start_date,
    to_char(okh.end_date,'DD-MON-YYYY')   end_date,
    okh.sts_code,
    octtl.name,
    okh.version_type       version_type,
    to_char(okh.date_approved, 'DD-MON-YYYY')      date_approved,
    okh.id                 "Agreement Id",
    okh.org_id, 
    --oalb2b.oalb2b_om_common_utils.get_region(okh.org_id) "Region",
    okh.contract_type_id   agreement_type_id,
    okh.attribute2         agreement_sub_type,
    okh.attribute1,
    okhtl.description,
    to_char(okh.last_update_date, 'DD-MON-YYYY') last_update_date,
    okh.contract_number,
    (SELECT count(orp.product_id) FROM oalb2b.oalorm_partner_agreements orm, oalb2b.oalorm_partner_products orp WHERE orm.partner_agreement_id = orp.partner_agreement_id and orm.agreement_id=okh.id and orp.STATUS='ACTIVE') as "Active Products"
FROM
    oalfsaas_repl.okc_k_headers_all_b     okh,
    oalfsaas_repl.okc_k_headers_tl        okhtl,
    oalfsaas_repl.okc_contract_types_b    oct,
    oalfsaas_repl.okc_contract_types_tl   octtl,
    oalfsaas_repl.okc_k_party_roles_b     okpr,
    oalfsaas_repl.hz_parties              hp,
    oalfsaas_repl.hz_cust_accounts        hca
WHERE
    okhtl.id = okh.id
    AND okhtl.major_version = okh.major_version
    AND oct.contract_type_id = okh.contract_type_id
    AND octtl.contract_type_id = oct.contract_type_id
    AND okpr.chr_id = okh.id
    AND okpr.major_version = okh.major_version
    AND hp.party_id = okpr.object1_id1
    AND hca.party_id = hp.party_id
    AND okh.major_version = (select max(okh2.major_version) FROM oalfsaas_repl.okc_k_headers_all_b okh2 where okh.id = okh2.id )
    AND okh.last_update_date >= systimestamp - 1
    ANd okh.sts_code in ('ACTIVE')
    AND octtl.name in ('OPN ESL','OPN ASFU - Schedule/Addendum/Attachment', 'OPN ESL - Schedule/Addendum/Attachment','OPN ASFU')
    and okh.attribute2 <> 'Prepaid Addendum'
) LOOP 
     email_body := '<table style="border: 1px solid black; border-collapse: collapse;">' || chr(10); -- Start table
     
      -- Table header
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px; background-color: #7FA5F9;"></td>' || chr(10); -- Empty cell in column 1
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px; background-color: #7FA5F9;">Results</td>' || chr(10); -- Heading with light blue background in column 2
  email_body := email_body || '</tr>' || chr(10);
  
  -- Table rows
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Enrollment ID</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;"></td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Partner Name</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">' || PARTNER_LOOP.party_name ||'</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Region</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">' || PARTNER_LOOP.account_number || '</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Account Number</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">' || PARTNER_LOOP.account_number || '</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Agreement Number</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">'||PARTNER_LOOP.contract_number|| '</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Agreement Type2</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">' || PARTNER_LOOP.name ||'</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);

  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Version</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">' || PARTNER_LOOP.major_version || '</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);   
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Start Date</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">'||PARTNER_LOOP.start_date||'</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);  
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">End Date</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">'||PARTNER_LOOP.end_date||'</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Agreement Status</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">' || PARTNER_LOOP.sts_code ||'</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Date Approved</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">'||PARTNER_LOOP.date_approved||'</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Last Update Date</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">'||PARTNER_LOOP.last_update_date||'</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Description</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">'||PARTNER_LOOP.description||'</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Org Id</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">' || PARTNER_LOOP.org_id ||'</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
    
  email_body := email_body || '<tr>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">Payment Term</td>' || chr(10);
  email_body := email_body || '<td style="border: 1px solid black; padding: 5px;">' || PARTNER_LOOP.attribute1 || '</td>' || chr(10);
  email_body := email_body || '</tr>' || chr(10);
  
  email_body := email_body || '</table>';-- End table
  
  email_subject := 'PTC - Data Upload - '|| PARTNER_LOOP.party_name || ' / ' || PARTNER_LOOP.attribute1;
  
  --call insertEmailRecord Procedure Here
  --insertEmailRecord(null, sysdate, 'lakshay.garg@oracle.com', 'lakshay.garg@oracle.com', email_body, email_subject, 
  --Add Region
  
  END LOOP;
  dbms_output.put_line(email_body);
  dbms_output.put_line(email_subject);
END
;

