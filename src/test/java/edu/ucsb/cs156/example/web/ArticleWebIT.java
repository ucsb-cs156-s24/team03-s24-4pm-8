package edu.ucsb.cs156.example.web;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import edu.ucsb.cs156.example.WebTestCase;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class ArticleWebIT extends WebTestCase {
    @Test
    public void admin_user_can_create_edit_delete_article() throws Exception {
        setupUser(true);

        page.getByText("Articles").click();

        page.getByText("Create New Article").click();

        System.out.println(page.content());
        //page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("create_new_article_page.png")));


        assertThat(page.getByText("Create New Article")).isVisible();
        page.getByTestId("ArticlesForm-title").fill("Cake");
        page.getByTestId("ArticlesForm-url").fill("www.cake.com");
        page.getByTestId("ArticlesForm-explanation").fill("I love cake");
        page.getByTestId("ArticlesForm-email").fill("cake@gmail.com");
        page.getByTestId("ArticlesForm-dateAdded").pressSequentially("2002-01-03T00:00:00");
        page.getByTestId("ArticlesForm-submit").click();

        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-explanation"))
                .hasText("I love cake");

        page.getByTestId("ArticlesTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit Article")).isVisible();
        page.getByTestId("ArticlesForm-explanation").fill("So much cake!");
        page.getByTestId("ArticlesForm-submit").click();

        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-explanation")).hasText("So much cake!");

        page.getByTestId("ArticlesTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-name")).not().isVisible();
    }    

}