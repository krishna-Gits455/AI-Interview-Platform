import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

import Loader from "../components/shared/Loader";
import EmptyState from "../components/shared/EmptyState";
import PageContainer from "../components/shared/PageContainer";

export default function DesignSystem() {
  return (
    <PageContainer>
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Design System
        </h1>

        <Card>
          <div className="flex gap-4 flex-wrap">
            <Button>Primary</Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="danger">
              Danger
            </Button>

            <Button variant="ghost">
              Ghost
            </Button>
          </div>
        </Card>

        <Card>
          <Input
            label="Email"
            placeholder="Enter email"
          />
        </Card>

        <Card>
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">
              Success
            </Badge>
            <Badge variant="warning">
              Warning
            </Badge>
            <Badge variant="danger">
              Danger
            </Badge>
          </div>
        </Card>

        <Card>
          <Loader />
        </Card>

        <Card>
          <EmptyState
            title="No Interviews Found"
            description="Create your first interview."
          />
        </Card>

      </div>
    </PageContainer>
  );
}