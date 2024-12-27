// Terms.tsx
import React from "react";
import "./Terms.css";

export function Terms(): JSX.Element {
    return (
        <div className="Terms">
            <header className="header">
                <h1>Terms of Service</h1>
                <p>Effective Date: [Insert Date]</p>
            </header>

            <section className="content">
                <h2>Welcome to [Your Coupon Site Name]!</h2>
                <p>
                    These Terms of Service ("Terms") govern your access to and use of our
                    website, services, and content (collectively, the "Service"). By using
                    our Service, you agree to be bound by these Terms. If you do not agree
                    to these Terms, you may not use the Service.
                </p>

                <h3>1. Acceptance of Terms</h3>
                <p>
                    By accessing or using the Service, you affirm that you are at least 18
                    years old or the age of majority in your jurisdiction and capable of
                    entering into a legally binding agreement. If you are using the Service
                    on behalf of a company or other legal entity, you represent that you
                    have the authority to bind that entity to these Terms.
                </p>

                <h3>2. Use of the Service</h3>
                <h4>2.1 Eligibility</h4>
                <p>
                    You must register an account to access certain features of the Service.
                    You are responsible for maintaining the confidentiality of your account
                    credentials and are fully responsible for all activities that occur
                    under your account.
                </p>

                <h4>2.2 Permitted Use</h4>
                <p>
                    You may use the Service solely for your personal, non-commercial
                    purposes to browse, discover, and redeem coupons.
                </p>

                <h4>2.3 Prohibited Activities</h4>
                <ul>
                    <li>Use the Service for any unlawful purpose or in violation of these Terms.</li>
                    <li>Submit false or misleading information when creating an account or redeeming a coupon.</li>
                    <li>
                        Distribute, modify, or create derivative works of the content
                        available on the Service.
                    </li>
                    <li>
                        Interfere with or disrupt the operation of the Service or attempt to
                        gain unauthorized access.
                    </li>
                    <li>
                        Use automated systems (e.g., bots or scrapers) to collect data from
                        the Service without our prior written consent.
                    </li>
                </ul>

                <h3>3. User Content</h3>
                <h4>3.1 Ownership of Content</h4>
                <p>
                    By submitting content to the Service (e.g., reviews, comments, or
                    feedback), you grant us a non-exclusive, worldwide, royalty-free,
                    perpetual, and irrevocable license to use, display, modify, and
                    distribute your content.
                </p>

                <h4>3.2 Responsibility for Content</h4>
                <p>
                    You are solely responsible for any content you submit, and you affirm
                    that your content does not violate any applicable laws or infringe on
                    the rights of third parties.
                </p>

                <h3>4. Coupons and Offers</h3>
                <h4>4.1 Coupon Validity</h4>
                <p>
                    We strive to ensure that all coupons and offers listed on the Service
                    are accurate and up-to-date. However, we do not guarantee the
                    availability, validity, or accuracy of any coupon or offer. Merchants
                    are solely responsible for the fulfillment of their promotions.
                </p>

                <h4>4.2 Redemption</h4>
                <p>
                    Coupons and offers are subject to the terms and conditions set by the
                    issuing merchants. Please read the individual terms of each coupon
                    before redeeming it. We are not responsible for any disputes between
                    you and the merchant.
                </p>

                <h3>5. Privacy</h3>
                <p>
                    Your use of the Service is subject to our Privacy Policy, which explains
                    how we collect, use, and protect your information. By using the
                    Service, you consent to our collection and use of your information in
                    accordance with the Privacy Policy.
                </p>

                <h3>6. Intellectual Property</h3>
                <p>
                    All content, trademarks, logos, and other materials on the Service are
                    the intellectual property of [Your Coupon Site Name] or its licensors.
                    You may not copy, reproduce, or distribute any part of the Service
                    without our prior written consent.
                </p>

                <h3>7. Disclaimer of Warranties</h3>
                <p>
                    The Service is provided on an "as-is" and "as-available" basis. We make
                    no warranties, express or implied, regarding the Service, including but
                    not limited to the accuracy of coupon listings, merchant reliability, or
                    uninterrupted availability.
                </p>

                <h3>8. Limitation of Liability</h3>
                <p>
                    To the fullest extent permitted by law, [Your Coupon Site Name] shall
                    not be liable for any direct, indirect, incidental, special,
                    consequential, or exemplary damages arising out of or in connection
                    with your use of the Service. This includes but is not limited to loss
                    of data, profits, or business opportunities.
                </p>

                <h3>9. Termination</h3>
                <p>
                    We may suspend or terminate your access to the Service at any time,
                    without notice or liability, for any reason, including but not limited
                    to a breach of these Terms.
                </p>

                <h3>10. Changes to Terms</h3>
                <p>
                    We reserve the right to modify these Terms at any time. Any changes will
                    be effective immediately upon posting the updated Terms on the Service.
                    Your continued use of the Service after the posting of revised Terms
                    constitutes your acceptance of those changes.
                </p>

                <h3>11. Governing Law</h3>
                <p>
                    These Terms are governed by and construed in accordance with the laws of
                    [Your Jurisdiction], without regard to its conflict of law principles.
                </p>

                <h3>12. Contact Us</h3>
                <p>
                    If you have any questions or concerns about these Terms, please contact
                    us at:
                </p>
                <address>
                    [Your Company Name]<br />
                    [Your Contact Email Address]<br />
                    [Your Physical Address]<br />
                    [Your Phone Number]
                </address>
            </section>
        </div>
    );
}
