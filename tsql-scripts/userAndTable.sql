USE master;
GO
CREATE LOGIN aplikacja_user WITH PASSWORD = 'HAHA I WONT TELL YOU';
GO
USE projDB
GO
CREATE USER aplikacja_user FOR LOGIN aplikacja_user;
GO
ALTER ROLE db_datareader ADD MEMBER aplikacja_user;
GO
ALTER ROLE db_datawriter ADD MEMBER aplikacja_user;
-- tworzenie xsl schema dla xml'a

CREATE XML SCHEMA COLLECTION DepositSchema AS
N'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="deposit">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="geology">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="type" type="xs:string"/>
              <xs:element name="estimatedVolume" type="xs:decimal"/>
              <xs:element name="depth" type="xs:decimal"/>
              <xs:element name="status" type="xs:string"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>

        <xs:element name="geography">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="location" type="xs:string"/>
              <xs:element name="region" type="xs:string"/>
              <xs:element name="latitude" type="xs:decimal"/>
              <xs:element name="longitude" type="xs:decimal"/>
              <xs:element name="radius" type="xs:decimal"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
      <xs:attribute name="name" type="xs:string" use="required"/>
    </xs:complexType>
  </xs:element>

</xs:schema>';

GO
CREATE TABLE xmltable(
    id INT IDENTITY(1,1) PRIMARY KEY,
    Content XML(DepositSchema),
);
GO
